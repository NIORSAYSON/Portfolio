/**
 * Diagnostic script to check embedding quality and similarity scores
 * Run: node scripts/diagnoseEmbeddings.mjs
 */

import { createClient } from "@supabase/supabase-js";
import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, "../.env.local") });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

async function generateEmbedding(text) {
  const res = await hf.featureExtraction({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    inputs: text,
  });
  return Array.isArray(res) ? res : Array.from(res);
}

// Compute cosine similarity manually
function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magA * magB);
}

async function diagnose() {
  console.log("🔍 EMBEDDING DIAGNOSTICS\n");

  // 1. Check document count
  console.log("📊 Checking database...");
  const { data: docs, error: fetchError } = await supabase
    .from("documents")
    .select("id, content, embedding, metadata");

  if (fetchError) {
    console.error("❌ Error fetching documents:", fetchError);
    return;
  }

  console.log(`✅ Found ${docs?.length || 0} documents in database\n`);

  if (!docs || docs.length === 0) {
    console.log("⚠️  Database is empty! Run populateSimple.mjs first.");
    return;
  }

  // 2. Check embedding dimensions
  console.log("📏 Checking embedding dimensions...");
  const sampleDoc = docs[0];
  const embeddingLength = sampleDoc.embedding?.length || 0;
  console.log(`  First document embedding dimension: ${embeddingLength}`);

  if (embeddingLength !== 384) {
    console.warn(
      `⚠️  WARNING: Expected 384 dimensions, got ${embeddingLength}`
    );
    console.warn(
      "  This might indicate wrong embedding model was used during indexing."
    );
    console.warn("  Consider re-running populateSimple.mjs\n");
  } else {
    console.log("  ✅ Dimension matches expected (384)\n");
  }

  // 3. Test a query
  const testQuery = "What is Nestor's work experience?";
  console.log(`🔍 Testing query: "${testQuery}"\n`);

  console.log("⏳ Generating query embedding...");
  const queryEmbedding = await generateEmbedding(testQuery);
  console.log(`✅ Query embedding: ${queryEmbedding.length} dimensions\n`);

  // 4. Test RPC function
  console.log("🔧 Testing match_documents RPC...");
  const { data: rpcResults, error: rpcError } = await supabase.rpc(
    "match_documents",
    {
      query_embedding: queryEmbedding,
      match_threshold: 0.1, // Very low threshold to see all results
      match_count: 10,
    }
  );

  if (rpcError) {
    console.error("❌ RPC Error:", rpcError);
    console.log("\n⚠️  The match_documents function might not exist!");
    console.log("You need to create it in Supabase SQL editor:");
    console.log("\nRun this SQL:\n");
    console.log(`
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding vector(384),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
LANGUAGE sql STABLE
AS $$
  SELECT
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) AS similarity
  FROM documents
  WHERE 1 - (documents.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
$$;
`);
    return;
  }

  console.log(`✅ RPC returned ${rpcResults?.length || 0} results\n`);

  if (rpcResults && rpcResults.length > 0) {
    console.log("📊 Top results from RPC:\n");
    rpcResults.forEach((doc, idx) => {
      console.log(
        `  [${idx + 1}] Similarity: ${doc.similarity.toFixed(
          3
        )} - ${doc.content.substring(0, 60)}...`
      );
    });
    console.log("");
  }

  // 5. Manually compute cosine similarity for comparison
  console.log("🧮 Computing manual cosine similarity for comparison...\n");
  const manualScores = docs.map((doc) => ({
    id: doc.id,
    content: doc.content.substring(0, 60),
    similarity: cosineSimilarity(queryEmbedding, doc.embedding),
  }));

  manualScores.sort((a, b) => b.similarity - a.similarity);

  console.log("📊 Top results from manual calculation:\n");
  manualScores.slice(0, 5).forEach((doc, idx) => {
    console.log(
      `  [${idx + 1}] Similarity: ${doc.similarity.toFixed(3)} - ${
        doc.content
      }...`
    );
  });
  console.log("");

  // 6. Compare RPC vs manual
  if (rpcResults && rpcResults.length > 0) {
    const rpcTopScore = rpcResults[0]?.similarity || 0;
    const manualTopScore = manualScores[0]?.similarity || 0;

    console.log("🔍 Comparison:");
    console.log(`  RPC top score:    ${rpcTopScore.toFixed(3)}`);
    console.log(`  Manual top score: ${manualTopScore.toFixed(3)}`);

    if (Math.abs(rpcTopScore - manualTopScore) > 0.01) {
      console.log("\n⚠️  WARNING: RPC and manual scores differ significantly!");
      console.log(
        "  Your match_documents function might be using wrong distance metric."
      );
      console.log("  Expected: cosine similarity (1 - (embedding <=> query))");
    } else {
      console.log("\n✅ RPC and manual scores match!");
    }
  }

  // 7. Check if scores are generally low
  const avgScore =
    manualScores.reduce((sum, s) => sum + s.similarity, 0) /
    manualScores.length;
  console.log(
    `\n📊 Average similarity across all docs: ${avgScore.toFixed(3)}`
  );

  if (manualScores[0].similarity < 0.5) {
    console.log("\n⚠️  WARNING: Even the best match has low similarity!");
    console.log("Possible causes:");
    console.log("  1. Documents in DB were embedded with a different model");
    console.log("  2. Embeddings are not normalized properly");
    console.log("  3. Query doesn't match any document content well");
    console.log(
      "\n💡 Recommendation: Re-run populateSimple.mjs to refresh embeddings"
    );
  } else {
    console.log("\n✅ Similarity scores look healthy!");
  }

  console.log("\n✨ Diagnosis complete!");
}

diagnose().catch(console.error);

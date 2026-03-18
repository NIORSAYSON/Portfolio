/**
 * Script to populate Supabase with knowledge base embeddings
 * Uses Groq's Nomic Embed model (nomic-embed-text-v1.5)
 *
 * Usage: node scripts/populateKnowledgeBase.js
 */

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Load environment variables
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

// Import knowledge base - we'll use dynamic import for ES modules
async function loadKnowledgeBase() {
  const knowledgeBasePath = path.resolve(
    __dirname,
    "../app/data/knowledgeBase.ts",
  );

  // For simplicity, we'll manually define the documents here
  // In production, you'd transpile the TS file or use a better approach
  return require("../app/data/knowledgeBase.ts").prepareDocumentsForEmbedding();
}

// Function to generate embeddings using Groq's Nomic Embed model
async function generateEmbedding(text) {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/embeddings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "nomic-embed-text-v1.5",
        input: text,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Embedding API error: ${response.statusText} - ${errorText}`,
      );
    }

    const data = await response.json();
    return data.data[0].embedding;
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw error;
  }
}

// Function to populate knowledge base
async function populateKnowledgeBase() {
  console.log("🚀 Starting knowledge base population...\n");

  try {
    // First, clear existing documents (optional)
    console.log("🗑️  Clearing existing documents...");
    const { error: deleteError } = await supabase
      .from("documents")
      .delete()
      .neq("id", 0); // Delete all

    if (deleteError) {
      console.warn(
        "Warning: Could not clear existing documents:",
        deleteError.message,
      );
    } else {
      console.log("✅ Existing documents cleared\n");
    }

    // Prepare documents
    const documents = await loadKnowledgeBase();
    console.log(`📚 Prepared ${documents.length} documents for embedding\n`);

    let successCount = 0;
    let errorCount = 0;

    // Process each document
    for (let i = 0; i < documents.length; i++) {
      const doc = documents[i];
      const docNumber = i + 1;

      try {
        console.log(
          `\n[${docNumber}/${documents.length}] Processing document...`,
        );
        console.log(`Type: ${doc.metadata.type}`);
        console.log(`Preview: ${doc.content.substring(0, 80)}...`);

        // Generate embedding
        console.log("  ⏳ Generating embedding...");
        const embedding = await generateEmbedding(doc.content);
        console.log(`  ✓ Embedding generated (${embedding.length} dimensions)`);

        // Insert into Supabase
        console.log("  ⏳ Inserting into database...");
        const { error } = await supabase.from("documents").insert({
          content: doc.content,
          metadata: doc.metadata,
          embedding: embedding,
        });

        if (error) {
          console.error(`  ❌ Error inserting document:`, error.message);
          errorCount++;
        } else {
          console.log(`  ✅ Successfully inserted`);
          successCount++;
        }

        // Add a small delay to avoid rate limiting
        if (docNumber < documents.length) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      } catch (error) {
        console.error(`  ❌ Error processing document:`, error.message);
        errorCount++;
      }
    }

    // Summary
    console.log("\n" + "=".repeat(50));
    console.log("📊 SUMMARY");
    console.log("=".repeat(50));
    console.log(`✅ Successfully inserted: ${successCount} documents`);
    console.log(`❌ Errors: ${errorCount} documents`);
    console.log(`📈 Total processed: ${documents.length} documents`);
    console.log("=".repeat(50));

    // Verify the data
    console.log("\n🔍 Verifying data in database...");
    const { count } = await supabase
      .from("documents")
      .select("*", { count: "exact", head: true });

    console.log(`✅ Total documents in database: ${count}`);

    if (errorCount === 0) {
      console.log("\n🎉 Knowledge base population completed successfully!");
    } else {
      console.log(
        "\n⚠️  Knowledge base population completed with some errors.",
      );
    }
  } catch (error) {
    console.error("\n❌ Fatal error:", error);
    throw error;
  }
}

// Main execution
console.log("╔════════════════════════════════════════════════════════╗");
console.log("║     Knowledge Base Population Script                  ║");
console.log("║     Using Groq Nomic Embed (768 dimensions)          ║");
console.log("╚════════════════════════════════════════════════════════╝\n");

// Check environment variables
const requiredVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_KEY",
  "GROQ_API_KEY",
];

const missingVars = requiredVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.error("❌ Missing required environment variables:");
  missingVars.forEach((varName) => console.error(`  - ${varName}`));
  console.error("\nPlease check your .env.local file");
  process.exit(1);
}

console.log("✅ Environment variables configured");
console.log("✅ Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log(
  "✅ Groq API Key:",
  process.env.GROQ_API_KEY
    ? "***" + process.env.GROQ_API_KEY.slice(-4)
    : "Not set",
);
console.log("");

// Run the population
populateKnowledgeBase()
  .then(() => {
    console.log("\n✨ All done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Fatal error occurred:", error);
    process.exit(1);
  });

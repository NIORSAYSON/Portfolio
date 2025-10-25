/**
 * Simple script to populate Supabase with knowledge base embeddings
 * Uses Hugging Face's Nomic Embed model (nomic-ai/nomic-embed-text-v1.5)
 *
 * Usage: node scripts/populateSimple.mjs
 */

import { createClient } from "@supabase/supabase-js";
import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: resolve(__dirname, "../.env.local") });

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Initialize Hugging Face client
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// Knowledge base documents (simplified inline version)
const documents = [
  {
    content: `Name: Nestor B. Sayson Jr.
Title: Front-End Developer
About: Front-End Developer with experience in building web and mobile applications, combining strong programming skills with a focus on intelligent, user-centered design. Research-oriented with a background in machine learning and Retrieval-Augmented Generation (RAG), and driven to create scalable, AI-powered solutions through collaboration and innovation.`,
    metadata: { type: "personal" },
  },
  {
    content: `Education - Bachelor's Degree
Institution: Camarines Sur Polytechnic Colleges (CSPC)
Degree: Bachelor of Science in Computer Science
Description: Gained a strong foundation in programming, software development, and emerging technologies such as artificial intelligence and machine learning. Developed practical skills through hands-on projects, research, and real-world applications in web and mobile development.`,
    metadata: { type: "education", level: "Bachelor's Degree" },
  },
  {
    content: `Work Experience - Frontend Developer Intern
Company: IntelliSeven Technology Solutions Inc.
Duration: 3 months
Description: Developed a tablet-based Point of Sale (POS) mobile application from scratch to support efficient retail operations. Designed and implemented a responsive, user-friendly interface and handled API integration to connect with backend services.
Technologies: React Native, Redux, TypeScript, Expo, API Integration`,
    metadata: {
      type: "experience",
      company: "IntelliSeven Technology Solutions Inc.",
    },
  },
  {
    content: `Skill - Web Development
Description: Specialize in front-end web development, building responsive and user-friendly websites using modern technologies. Focus on creating clean, interactive interfaces that provide a smooth and engaging experience for users across all devices, and integrate APIs to connect the front end with dynamic data and external services.
Technologies: React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, Bootstrap`,
    metadata: { type: "skill", category: "webDevelopment" },
  },
  {
    content: `Skill - Machine Learning
Description: Explore machine learning by building models that can analyze data, recognize patterns, and make predictions. Work on training, testing, and improving these models to solve real-world problems using tools like Python and popular ML libraries.
Technologies: Python, Scikit-learn, TensorFlow, Pandas, NumPy`,
    metadata: { type: "skill", category: "machineLearning" },
  },
  {
    content: `Skill - Large Language Model
Description: Work with large language models and use Retrieval-Augmented Generation (RAG) to build more accurate and context-aware applications. By combining LLMs with external knowledge sources, enable the model to retrieve relevant information and generate reliable, real-time responses for tasks like question answering and conversational agents.
Technologies: LangChain, RAG, LLaMA 3, ChatGroq, Hugging Face`,
    metadata: { type: "skill", category: "llm" },
  },
  {
    content: `Project - My Portfolio
Category: Web Development
Technologies: React, Next.js, Tailwind, TypeScript, Framer Motion, Vercel
Description: Fully responsive and modern portfolio web application developed from scratch using React, Next.js, and TypeScript. Supports dark and light mode toggling. Deployed via Vercel.
Link: https://niorsayson.vercel.app/`,
    metadata: { type: "project", category: "Web Development" },
  },
  {
    content: `Project - CSPC Conversational Agent
Category: AI & Machine Learning
Technologies: Python, RAG, LLaMA 3, ChatGroq, Langchain, Hugging Face
Description: Thesis project - intelligent, domain-specific conversational agent designed to assist users in navigating the Citizen's Charter of CSPC. Leverages Retrieval-Augmented Generation (RAG) and a fine-tuned LLaMA 3 model.
Link: https://huggingface.co/spaces/Nioooor/CSPC_Conversational_Agent`,
    metadata: { type: "project", category: "AI & Machine Learning" },
  },
  {
    content: `Project - Point of Sale System App
Category: Mobile Development
Technologies: React Native, Redux, TypeScript, Expo, API Integration
Description: Mobile Point-of-Sale application developed during internship. Built with React Native and TypeScript, with Redux for state management.`,
    metadata: { type: "project", category: "Mobile Development" },
  },
  {
    content: `Q: What is Nestor's educational background?
A: Nestor graduated with a Bachelor of Science in Computer Science from Camarines Sur Polytechnic Colleges (CSPC).`,
    metadata: { type: "faq" },
  },
  {
    content: `Q: What technologies does Nestor know?
A: Nestor is proficient in web development (React, Next.js, TypeScript, Tailwind CSS), mobile development (React Native, Expo), machine learning (Python, Scikit-learn, TensorFlow), and has experience with LLMs and RAG using LangChain and Groq.`,
    metadata: { type: "faq" },
  },
  {
    content: `Q: What kind of projects has Nestor worked on?
A: Nestor has worked on various projects including a personal portfolio website, a conversational AI agent using RAG, mobile POS system, task management apps, and data generation tools.`,
    metadata: { type: "faq" },
  },
  {
    content: `Q: Does Nestor have work experience?
A: Yes, Nestor completed a 3-month internship at IntelliSeven Technology Solutions Inc. as a Frontend Developer, where he developed a Point of Sale mobile application.`,
    metadata: { type: "faq" },
  },
];

// Function to generate embeddings using Hugging Face's sentence-transformers
// Using all-MiniLM-L6-v2 which produces 384-dimensional embeddings
async function generateEmbedding(text) {
  try {
    const response = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: text,
    });

    // The response is already an array of numbers (the embedding)
    return Array.isArray(response) ? response : Array.from(response);
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
        "⚠️  Warning: Could not clear existing documents:",
        deleteError.message
      );
    } else {
      console.log("✅ Existing documents cleared\n");
    }

    console.log(`📚 Processing ${documents.length} documents\n`);

    let successCount = 0;
    let errorCount = 0;

    // Process each document
    for (let i = 0; i < documents.length; i++) {
      const doc = documents[i];
      const docNumber = i + 1;

      try {
        console.log(`[${docNumber}/${documents.length}] Processing...`);
        console.log(`  Type: ${doc.metadata.type}`);
        console.log(`  Preview: ${doc.content.substring(0, 60)}...`);

        // Generate embedding
        console.log("  ⏳ Generating embedding...");
        const embedding = await generateEmbedding(doc.content);
        console.log(
          `  ✅ Embedding generated (${embedding.length} dimensions)`
        );

        // Insert into Supabase
        console.log("  ⏳ Inserting into database...");
        const { error } = await supabase.from("documents").insert({
          content: doc.content,
          metadata: doc.metadata,
          embedding: embedding,
        });

        if (error) {
          console.error(`  ❌ Error:`, error.message);
          errorCount++;
        } else {
          console.log(`  ✅ Inserted successfully\n`);
          successCount++;
        }

        // Small delay to avoid rate limiting
        if (docNumber < documents.length) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      } catch (error) {
        console.error(`  ❌ Error:`, error.message, "\n");
        errorCount++;
      }
    }

    // Summary
    console.log("=".repeat(50));
    console.log("📊 SUMMARY");
    console.log("=".repeat(50));
    console.log(`✅ Success: ${successCount} documents`);
    console.log(`❌ Errors: ${errorCount} documents`);
    console.log(`📈 Total: ${documents.length} documents`);
    console.log("=".repeat(50));

    // Verify the data
    console.log("\n🔍 Verifying database...");
    const { count } = await supabase
      .from("documents")
      .select("*", { count: "exact", head: true });

    console.log(`✅ Total in database: ${count} documents`);

    if (errorCount === 0) {
      console.log("\n🎉 Success! Knowledge base ready!");
    } else {
      console.log("\n⚠️  Completed with some errors.");
    }
  } catch (error) {
    console.error("\n❌ Fatal error:", error);
    throw error;
  }
}

// Main execution
console.log("╔════════════════════════════════════════════════════════╗");
console.log("║   Knowledge Base Population Script                    ║");
console.log("║   Sentence Transformers (384 dimensions)              ║");
console.log("╚════════════════════════════════════════════════════════╝\n");

// Check environment variables
const requiredVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_KEY",
  "HUGGINGFACE_API_KEY",
];

const missingVars = requiredVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.error("❌ Missing environment variables:");
  missingVars.forEach((varName) => console.error(`  - ${varName}`));
  console.error("\nCheck your .env.local file");
  process.exit(1);
}

console.log("✅ Environment configured");
console.log(`✅ Supabase: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);
console.log(
  `✅ Hugging Face API: ***${process.env.HUGGINGFACE_API_KEY.slice(-4)}\n`
);

// Run
populateKnowledgeBase()
  .then(() => {
    console.log("\n✨ Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Fatal error:", error);
    process.exit(1);
  });

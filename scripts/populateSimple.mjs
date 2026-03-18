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
  process.env.SUPABASE_SERVICE_KEY,
);

// Initialize Hugging Face client
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// Knowledge base documents (updated to match latest knowledgeBase.ts)
const documents = [
  // --- PERSONAL INFO ---
  {
    content: `Name: Nestor B. Sayson Jr. (Nickname: Nior)
Title: Full-Stack Software Engineer & AI Automation Engineer
Email: nessayson@gmail.com
About: I'm a Full-Stack Software Engineer and AI Automation Engineer specializing in developing end-to-end solutions with JavaScript/TypeScript and Python. My work spans across building modern web applications, developing mobile apps with React Native, and architecting intelligent automation workflows using n8n and Zapier.
As a freelance developer, I specialize in bringing complex ideas to life by building custom, full-stack software solutions from the ground up. I am actively open to new project offers and love partnering with businesses to build scalable, user-centered applications. When I am not working with clients, I am actively building personal projects to experiment with new technologies and refine my development skills.
Lately, I've been diving deeper into the world of Artificial Intelligence and Machine Learning. My focus is on integrating AI tools, Retrieval-Augmented Generation (RAG), and advanced automations into modern applications to optimize workflows and deliver cutting-edge, intelligent systems.`,
    metadata: { type: "personal" },
  },
  {
    content: `Nior's Social Media and Contact Links:
Facebook: https://www.facebook.com/nioooooor?mibextid=ZbWKwL
Instagram: https://www.instagram.com/neon.nior/
Gmail: mailto:nessayson@gmail.com
LinkedIn: https://www.linkedin.com/in/nestor-sayson-b8671b292/
GitHub: https://github.com/NIORSAYSON`,
    metadata: { type: "personal_links" },
  },

  // --- SERVICES ---
  {
    content: `Service Offered - Full-Stack Web Development
Description: Custom end-to-end web applications built with Next.js, React, and Node.js. Focus on scalable architectures and responsive, accessible user interfaces.`,
    metadata: { type: "service" },
  },
  {
    content: `Service Offered - Mobile App Development
Description: Cross-platform mobile applications for iOS and Android using React Native and Expo, complete with complex backend integrations and real-time features.`,
    metadata: { type: "service" },
  },
  {
    content: `Service Offered - AI & Workflow Automation
Description: Designing intelligent business workflows using n8n and Zapier. Integrating custom LLMs, RAG pipelines, and AI agents into existing business processes to save time and reduce manual tasks.`,
    metadata: { type: "service" },
  },

  // --- EDUCATION ---
  {
    content: `Education - Bachelor's Degree
Institution: Camarines Sur Polytechnic Colleges (CSPC)
Degree: Bachelor of Science in Computer Science
Description: Gained a strong foundation in programming, software development, and emerging technologies such as artificial intelligence and machine learning. Developed practical skills through hands-on projects, research, and real-world applications in web and mobile development.`,
    metadata: { type: "education", level: "Bachelor's Degree" },
  },
  {
    content: `Education - Senior High School
Institution: General Academic Strand (GAS)
Description: Completed Senior High School under the General Academic Strand (GAS), which provided a well-rounded curriculum covering core subjects in mathematics, science, humanities, social sciences, and communication.`,
    metadata: { type: "education", level: "Senior High School" },
  },
  {
    content: `Education - Junior High School
Institution: Technical-Vocational Education
Description: Completed Junior High School with specialization in Computer System Services. Introduced to the basics of computer hardware, software installation, and troubleshooting.`,
    metadata: { type: "education", level: "Junior High School" },
  },

  // --- EXPERIENCE ---
  {
    content: `Work Experience - AI Automation Engineer
Company: AgentGenius.ai
Duration: August 2025 - Present
Description: As an AI Automation Engineer, I bridge the gap between complex AI technology and practical business needs. I design, develop, and maintain full-stack applications using React and Supabase, while powering the backend logic with intelligent n8n automation workflows. Beyond writing code, I work directly with our clients—acting as their technical partner to gather requirements, communicate progress, and deliver custom AI solutions that streamline their operations.
Technologies: React, Supabase, n8n, Zapier, AI Models`,
    metadata: { type: "experience", company: "AgentGenius.ai" },
  },
  {
    content: `Work Experience - Freelance Developer
Company: Independent Software Engineer
Duration: June 2025 - Present
Description: I offer comprehensive full-stack services for web and mobile as an independent developer, specializing in a modern stack that includes Next.js, Vite, and React Native. As the technical lead for my clients, I manage every phase of the project—from UI implementation to complex API development using Node.js and Express. By utilizing Supabase and MongoDB for robust data handling, I consistently deliver high-quality, full-stack applications that are optimized for performance and ready for real-world deployment.
Technologies: Next.js, Vite, React Native, Node.js, Express, Supabase, MongoDB`,
    metadata: { type: "experience", company: "Independent Software Engineer" },
  },
  {
    content: `Work Experience - Frontend Developer
Company: IntelliSeven Technology Solutions Inc.
Duration: March - June 2025
Description: During my internship, I contributed to the front-end development of a new tablet-based Point of Sale (POS) application built from scratch. Using React Native, Expo, and Redux, I helped implement the user interface from existing designs and managed state and API integrations. I collaborated closely with the design and backend teams to build a solid foundation for the app's future release.
Technologies: React Native, Redux, TypeScript, Expo, API Integration`,
    metadata: {
      type: "experience",
      company: "IntelliSeven Technology Solutions Inc.",
    },
  },

  // --- SKILLS ---
  {
    content: `Skill - Web Development
Description: Specialize in front-end web development, building responsive and user-friendly websites using modern technologies. Focus on creating clean, interactive interfaces that provide a smooth and engaging experience for users across all devices, and integrate APIs to connect the front end with dynamic data and external services.
Technologies: React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, Bootstrap`,
    metadata: { type: "skill", category: "webDevelopment" },
  },
  {
    content: `Skill - Mobile Development
Description: Experience in building cross-platform mobile applications
Technologies: React Native, Expo, Redux`,
    metadata: { type: "skill", category: "mobileDevelopment" },
  },
  {
    content: `Skill - AI Automation
Description: I design and build automated workflows using tools like n8n and Zapier, connecting apps and AI models to streamline repetitive tasks and power intelligent pipelines.
Technologies: n8n, Zapier, Automated Workflows, API Integration`,
    metadata: { type: "skill", category: "aiAutomation" },
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

  // --- PROJECTS ---
  {
    content: `Project - AgriMarket Mobile App
Category: Mobile Development
Technologies: React Native, Expo, TypeScript, Redux Toolkit, RTK Query, Socket.io
Description: AgriMarket is a comprehensive mobile e-commerce platform designed to connect local farmers directly with consumers. Built from the ground up with React Native and Expo, the application provides a seamless marketplace experience with dedicated interfaces for three distinct user roles: Buyers, Sellers (Farmers), and Administrators. Features Real-Time Communication via Socket.io, Advanced State Management, Complete E-commerce Flows, and dedicated Seller/Admin Analytics.
Link: https://github.com/NIORSAYSON/agrimarket`,
    metadata: { type: "project", category: "Mobile Development" },
  },
  {
    content: `Project - Campus Information System (BUSIS)
Category: Full Stack Development & Mobile Development
Technologies: React Native, Expo, TypeScript, Redux Toolkit, Node.js, Express.js, MongoDB, 3D Mapping
Description: The Campus Information System (BUSIS) is a comprehensive full-stack mobile application designed to centralize university announcements, events, department directories, and campus navigation into a single, accessible platform. Features a React Native mobile frontend with an interactive 3D Campus Map, powered by a robust REST API using Node.js, Express.js, and MongoDB.
Link: https://github.com/NIORSAYSON/busis`,
    metadata: {
      type: "project",
      category: "Full Stack Development & Mobile Development",
    },
  },
  {
    content: `Project - FadeFlow - Barbershop SaaS
Category: Full Stack Development & Web Development
Technologies: Next.js, TypeScript, Tailwind CSS, Supabase, Radix UI, Zod
Description: FadeFlow is a comprehensive Software-as-a-Service (SaaS) platform tailored for barbershops and salons, designed to streamline appointment bookings and business management. Features a seamless client booking flow and a powerful administrative dashboard for business owners, built on Next.js and securely powered by Supabase.
Link: https://github.com/NIORSAYSON/fadeflow-saas`,
    metadata: {
      type: "project",
      category: "Full Stack Development & Web Development",
    },
  },
  {
    content: `Project - VibeNode
Category: Full Stack Development, Web Development & AI Integration
Technologies: React, Vite, Node.js, Socket.io, Redis, AI Integration
Description: VibeNode is an innovative real-time chat and matchmaking platform designed to connect users based on shared interests and "wavelengths." Handles concurrent connections, real-time messaging, and intelligent user pairing using Redis, Socket.io, and smart AI Matchmaking algorithms.
Link: https://vibenode.site`,
    metadata: {
      type: "project",
      category: "Full Stack Development, Web Development & AI Integration",
    },
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
    content: `Project - Notes App
Category: Mobile Development
Technologies: React Native, Expo, Redux Toolkit, redux-persist, TypeScript
Description: Simple and intuitive mobile notes application with secure mock login, persistent sessions, and full CRUD functionality.
Link: https://github.com/NIORSAYSON/notes-app`,
    metadata: { type: "project", category: "Mobile Development" },
  },
  {
    content: `Project - Task Manager App
Category: Web Development
Technologies: Next.js, Express.js, MongoDB, TypeScript, Tailwind CSS, Radix UI, Zustand
Description: Full-stack task management application with user authentication, task organization, and both list and Kanban board views.
Link: https://github.com/NIORSAYSON/task-manager-app`,
    metadata: { type: "project", category: "Web Development" },
  },
  {
    content: `Project - SIAS Online Portal Redesign
Category: Web Development
Technologies: HTML, CSS, JavaScript, Bootstrap
Description: HCI course project - redesigned SIAS portal focusing on improved usability and user experience with modern UI principles.
Link: https://niorsayson.github.io/SIAS-Online-Portal-Redesign/`,
    metadata: { type: "project", category: "Web Development" },
  },
  {
    content: `Project - Synthetic Data Generator
Category: AI & Machine Learning
Technologies: Python, Streamlit, Scikit-learn, Pandas, NumPy, Matplotlib, Seaborn
Description: Tool for generating synthetic datasets with customizable parameters, includes model training module and simulation features.
Link: https://synthetic-data-generator-sayson.streamlit.app/`,
    metadata: { type: "project", category: "AI & Machine Learning" },
  },

  // --- FAQS ---
  {
    content: `Q: What is Nestor's educational background?
A: Nestor graduated with a Bachelor of Science in Computer Science from Camarines Sur Polytechnic Colleges (CSPC).`,
    metadata: { type: "faq" },
  },
  {
    content: `Q: What technologies does Nestor know?
A: Nestor is proficient in web development (React, Next.js, TypeScript, Tailwind CSS), mobile development (React Native, Expo), machine learning (Python, Scikit-learn, TensorFlow), and AI Automation using n8n and Zapier. He also has strong experience with LLMs and RAG using LangChain and Groq.`,
    metadata: { type: "faq" },
  },
  {
    content: `Q: What kind of projects has Nestor worked on?
A: Nestor has worked on a diverse array of projects including comprehensive SaaS platforms (FadeFlow), full-stack campus management systems with 3D mapping (BUSIS), mobile e-commerce platforms (AgriMarket), real-time AI matchmaking chat apps (VibeNode), conversational AI agents using RAG, and various other full-stack systems.`,
    metadata: { type: "faq" },
  },
  {
    content: `Q: Does Nestor have work experience?
A: Yes, Nestor currently works as an AI Automation Engineer at AgentGenius.ai and operates as a Freelance Full-Stack Developer. Previously, he completed a frontend developer internship at IntelliSeven Technology Solutions Inc., where he developed a tablet-based Point of Sale mobile application.`,
    metadata: { type: "faq" },
  },
  {
    content: `Q: Is Nior currently available for freelance work?
A: Yes, Nior is actively open to new freelance projects and opportunities. You can reach out to him via email at nessayson@gmail.com to discuss your project.`,
    metadata: { type: "faq" },
  },
  {
    content: `Q: What is Nior's preferred tech stack?
A: For web, Nior prefers Next.js, React, Tailwind CSS, and Node.js/Express. For mobile, he uses React Native with Expo. For databases, he relies on Supabase, PostgreSQL, and MongoDB. He also uses Python for AI and machine learning tasks.`,
    metadata: { type: "faq" },
  },
  {
    content: `Q: What timezone does Nior work in?
A: Nior is based in the Philippines (PST/GMT+8), but he is highly adaptable and experienced in working asynchronously with clients across different timezones.`,
    metadata: { type: "faq" },
  },
  {
    content: `Q: How does Nior approach a new project?
A: Nior acts as a technical partner. He starts by understanding the core business requirements, designs a scalable architecture (database schema, UI/UX flow), and develops the solution iteratively while maintaining clear communication with the client.`,
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
        deleteError.message,
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
          `  ✅ Embedding generated (${embedding.length} dimensions)`,
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
  `✅ Hugging Face API: ***${process.env.HUGGINGFACE_API_KEY.slice(-4)}\n`,
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

import { NextRequest, NextResponse } from "next/server";
// Delay importing heavy LLM/embedding libraries until request time to avoid
// inflating the dev server bundle and causing out-of-memory failures.

// Note: Supabase client, chat model, and HF client are created per-request
// below to keep the dev server lightweight during startup and avoid build-time errors.

export async function POST(request: NextRequest) {
  try {
    console.log("📨 Received chat request");

    const { message, chatHistory } = await request.json();
    console.log("💬 Message:", message);

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    console.log("📦 Loading AI dependencies...");
    // Lazy-import heavy dependencies so we only load them when this
    // endpoint is called. This reduces memory and CPU pressure during
    // Next.js dev server startup.
    const [{ ChatGroq }, { PromptTemplate }, hfModule, { createClient }] =
      await Promise.all([
        import("@langchain/groq"),
        import("@langchain/core/prompts"),
        import("@huggingface/inference"),
        import("@supabase/supabase-js"),
      ]);

    const { HfInference } = hfModule;
    console.log("✅ Dependencies loaded");

    // Initialize Supabase client (per-request to avoid build-time errors)
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!,
    );

    // Initialize HF client and embedding helper (per-request)
    const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
    async function generateEmbedding(text: string): Promise<number[]> {
      try {
        const res = await hf.featureExtraction({
          model: "sentence-transformers/all-MiniLM-L6-v2",
          inputs: text,
        });

        // The HF client may return nested arrays. Normalize to a flat number[]
        if (Array.isArray(res)) {
          // If it's nested ([ [nums] ]) flatten to 1D
          if (Array.isArray(res[0])) {
            return (res as number[][]).flat(Infinity) as number[];
          }
          return res as number[];
        }

        return Array.from(res as ArrayLike<number>) as number[];
      } catch (err) {
        console.error("❌ Error generating embedding:", err);
        throw err;
      }
    }

    console.log("🔢 Generating embedding for query...");

    // For better retrieval with follow-up questions, create a standalone query
    // that incorporates recent context if needed
    let searchQuery = message;

    // If the message is short and there's chat history, it might be a follow-up
    // Use last 2 messages for context to make the query more specific
    if (message.length < 50 && chatHistory && chatHistory.length > 0) {
      const recentContext = chatHistory
        .slice(-2)
        .map(
          (m: { role: string; content: string }) =>
            `${m.role === "user" ? "Q" : "A"}: ${m.content}`,
        )
        .join("\n");

      searchQuery = `${recentContext}\nCurrent question: ${message}`;
      console.log("🔄 Enhanced query with context for better retrieval");
    }

    // Generate embedding for the search query
    const queryEmbedding = await generateEmbedding(searchQuery);
    console.log(`✅ Embedding generated (${queryEmbedding.length} dimensions)`);

    console.log("🔍 Searching Supabase for relevant documents...");
    // Retrieve relevant documents from Supabase using vector similarity
    const { data: relevantDocs, error: searchError } = await supabase.rpc(
      "match_documents",
      {
        query_embedding: queryEmbedding,
        match_threshold: 0.3, // Lowered threshold for better recall
        match_count: 5, // Number of relevant documents to retrieve
      },
    );

    if (searchError) {
      console.error("❌ Supabase search error:", searchError);
      throw searchError;
    }

    console.log(`📚 Found ${relevantDocs?.length || 0} relevant documents`);

    interface RelevantDoc {
      content: string;
      similarity?: number;
    }

    // Log the documents found for debugging
    if (relevantDocs && relevantDocs.length > 0) {
      relevantDocs.forEach((doc: RelevantDoc, idx: number) => {
        console.log(
          `  [${idx + 1}] Similarity: ${doc.similarity?.toFixed(
            3,
          )} - ${doc.content.substring(0, 80)}...`,
        );
      });
    } else {
      console.warn(
        "⚠️ No relevant documents found! Check your embeddings and threshold.",
      );
    }

    // Combine retrieved documents into context
    const context =
      relevantDocs && relevantDocs.length > 0
        ? relevantDocs.map((doc: RelevantDoc) => doc.content).join("\n\n")
        : "No specific information available.";

    console.log("📝 Context length:", context.length, "characters");

    // Format chat history
    const formattedHistory =
      chatHistory && chatHistory.length > 0
        ? chatHistory
            .slice(-5) // Only use last 5 messages for context
            .map(
              (m: { role: string; content: string }) =>
                `${m.role === "user" ? "Human" : "Assistant"}: ${m.content}`,
            )
            .join("\n")
        : "";

    // Create prompt template explicitly
    const promptTemplate = new PromptTemplate({
      template: `You are Nestor Sayson Jr., a Software Developer and Computer Science graduate. Answer as Nestor in the first person (use "I", "my", etc.) and speak from Nestor's perspective.

Use the information provided below to answer the user's question accurately and conversationally.

IMPORTANT RULES:
1. Answer ONLY using the information in the Context section below
2. If the context contains relevant information, use it to give a detailed, helpful answer
3. Be conversational and friendly
4. Keep responses concise but informative
5. DO NOT use markdown formatting (no **, __, #, etc.) - use plain text only
6. Use simple punctuation and natural language instead of markdown
7. Always respond in first-person as Nestor Sayson Jr. Do not describe yourself as an assistant or use third-person phrasing.

Context Information:
{context}

Previous conversation:
{chatHistory}

User's question: {question}

Your response (plain text, first-person as Nestor):`,
      inputVariables: ["context", "chatHistory", "question"],
    });

    // Initialize the Groq chat model per-request
    const model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY!,
      model: "openai/gpt-oss-120b", // Using gpt-oss-120b for better understanding
      temperature: 0.7,
      maxTokens: 1024,
    });

    // Build the final prompt string
    const promptString = await promptTemplate.format({
      context,
      chatHistory: formattedHistory,
      question: message,
    });

    console.log("🔍 Calling Groq model with prompt...");

    // Call the model using invoke (standard LangChain method)
    // ChatGroq expects messages, not a plain string
    const response = await model.invoke([
      { role: "user", content: promptString },
    ]);

    // Extract the text content from the response
    const parsedResponse =
      typeof response.content === "string"
        ? response.content
        : JSON.stringify(response.content);

    console.log("✅ Got response from Groq");

    // Optionally store the conversation in Supabase
    try {
      await supabase.from("chat_messages").insert([
        {
          message: message,
          is_user: true,
        },
        {
          message: parsedResponse,
          is_user: false,
        },
      ]);
    } catch (dbError) {
      // Log but don't fail the request if storing fails
      console.error("Error storing chat messages:", dbError);
    }

    return NextResponse.json({ response: parsedResponse });
  } catch (error) {
    console.error("❌❌❌ ERROR IN CHAT API ❌❌❌");
    console.error("Error type:", error?.constructor?.name);
    console.error(
      "Error message:",
      error instanceof Error ? error.message : String(error),
    );
    console.error("Full error:", error);
    console.error(
      "Stack trace:",
      error instanceof Error ? error.stack : "No stack",
    );

    return NextResponse.json(
      {
        error: "Failed to process message",
        details: error instanceof Error ? error.message : "Unknown error",
        type:
          (error as { constructor?: { name?: string } })?.constructor?.name ||
          "Unknown",
      },
      { status: 500 },
    );
  }
}

-- ============================================
-- Supabase Database Setup for Chat Application
-- Using Sentence Transformers all-MiniLM-L6-v2 (384 dimensions)
-- ============================================

-- Step 1: Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Step 2: Create documents table for knowledge base storage
-- Sentence Transformers all-MiniLM-L6-v2 produces 384-dimensional vectors
CREATE TABLE IF NOT EXISTS documents (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::JSONB,
  embedding vector(384), -- Sentence Transformers dimension size
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Step 3: Create chat_messages table for conversation history
CREATE TABLE IF NOT EXISTS chat_messages (
  id BIGSERIAL PRIMARY KEY,
  session_id UUID DEFAULT gen_random_uuid(),
  message TEXT NOT NULL,
  is_user BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Step 4: Create index for faster vector similarity search
-- Using HNSW index for better performance (recommended for production)
CREATE INDEX IF NOT EXISTS documents_embedding_idx 
ON documents 
USING hnsw (embedding vector_cosine_ops);

-- Alternative: Use IVFFlat if you prefer (good for medium datasets)
-- CREATE INDEX IF NOT EXISTS documents_embedding_idx 
-- ON documents 
-- USING ivfflat (embedding vector_cosine_ops) 
-- WITH (lists = 100);

-- Step 5: Create function for vector similarity search
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding vector(384),
  match_threshold FLOAT DEFAULT 0.7,
  match_count INT DEFAULT 5
)
RETURNS TABLE (
  id BIGINT,
  content TEXT,
  metadata JSONB,
  similarity FLOAT
)
LANGUAGE SQL STABLE
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

-- Step 6: Create indexes for better query performance
CREATE INDEX IF NOT EXISTS chat_messages_session_id_idx 
ON chat_messages(session_id);

CREATE INDEX IF NOT EXISTS chat_messages_timestamp_idx 
ON chat_messages(created_at DESC);

CREATE INDEX IF NOT EXISTS documents_created_at_idx 
ON documents(created_at DESC);

-- Step 7: Enable Row Level Security (optional but recommended)
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access (adjust as needed)
CREATE POLICY "Allow public read access to documents" 
ON documents FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert to documents" 
ON documents FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public read access to chat_messages" 
ON chat_messages FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert to chat_messages" 
ON chat_messages FOR INSERT 
WITH CHECK (true);

-- ============================================
-- Verification Queries
-- ============================================

-- Check if pgvector extension is enabled
SELECT * FROM pg_extension WHERE extname = 'vector';

-- Verify tables are created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('documents', 'chat_messages');

-- Check indexes
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename IN ('documents', 'chat_messages');

-- ============================================
-- Utility Functions
-- ============================================

-- Function to count documents
CREATE OR REPLACE FUNCTION count_documents()
RETURNS INTEGER
LANGUAGE SQL STABLE
AS $$
  SELECT COUNT(*)::INTEGER FROM documents;
$$;

-- Function to get recent chat messages
CREATE OR REPLACE FUNCTION get_recent_messages(
  p_session_id UUID DEFAULT NULL,
  p_limit INT DEFAULT 50
)
RETURNS TABLE (
  id BIGINT,
  session_id UUID,
  message TEXT,
  is_user BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE SQL STABLE
AS $$
  SELECT 
    id,
    session_id,
    message,
    is_user,
    created_at
  FROM chat_messages
  WHERE 
    CASE 
      WHEN p_session_id IS NOT NULL THEN session_id = p_session_id
      ELSE TRUE
    END
  ORDER BY created_at DESC
  LIMIT p_limit;
$$;

-- ============================================
-- Sample Queries for Testing
-- ============================================

-- After populating data, test similarity search:
-- SELECT * FROM match_documents(
--   '[0.1, 0.2, ...]'::vector(384),  -- Your query embedding
--   0.7,  -- Similarity threshold
--   5     -- Number of results
-- );

-- View all documents:
-- SELECT id, LEFT(content, 100) as preview, metadata, created_at 
-- FROM documents 
-- ORDER BY created_at DESC;

-- View chat history:
-- SELECT * FROM get_recent_messages(NULL, 20);

-- ============================================
-- Notes
-- ============================================
-- 1. Run this entire script in Supabase SQL Editor
-- 2. Make sure pgvector extension is available in your Supabase project
-- 4. Adjust RLS policies based on your security requirements
-- 5. The HNSW index provides better performance but requires PostgreSQL 14+
-- 6. For Sentence Transformers all-MiniLM-L6-v2, we use 384 dimensions

-- Create diaries table
CREATE TABLE IF NOT EXISTS diaries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  emotion TEXT CHECK (emotion IN ('happy', 'sad', 'angry', 'anxious', 'neutral')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE diaries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to only see their own diaries
CREATE POLICY "Users can only see their own diaries" ON diaries
  FOR ALL
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX diaries_user_id_idx ON diaries(user_id);
CREATE INDEX diaries_created_at_idx ON diaries(created_at DESC);

-- Set up realtime
ALTER PUBLICATION supabase_realtime ADD TABLE diaries;

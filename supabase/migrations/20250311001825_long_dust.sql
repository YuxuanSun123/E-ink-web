/*
  # Remove authentication requirements and enable anonymous posting

  1. Changes
    - Drop existing RLS policies
    - Drop auth-related columns (author_id, author_email)
    - Add display_name column for optional attribution
    - Create new RLS policies for anonymous access
  
  2. Security
    - Enable public read access
    - Enable anonymous posting
*/

-- First drop the existing policies that depend on author_id
DROP POLICY IF EXISTS "Anyone can read posts" ON posts;
DROP POLICY IF EXISTS "Authenticated users can create posts" ON posts;
DROP POLICY IF EXISTS "Authors can delete their own posts" ON posts;
DROP POLICY IF EXISTS "Authors can update their own posts" ON posts;

-- Now we can safely remove the auth-related columns
ALTER TABLE posts 
DROP COLUMN IF EXISTS author_id,
DROP COLUMN IF EXISTS author_email;

-- Add the new display_name column
ALTER TABLE posts
ADD COLUMN IF NOT EXISTS display_name text;

-- Create new policies for anonymous access
CREATE POLICY "Enable read access for all users" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON posts
  FOR INSERT WITH CHECK (true);
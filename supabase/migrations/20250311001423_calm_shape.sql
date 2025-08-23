/*
  # Remove authentication requirements

  1. Changes
    - Drop author_id and author_email columns from posts table
    - Add optional display_name column
    - Update RLS policies to allow anonymous access
*/

-- Remove auth-related columns
ALTER TABLE posts 
DROP COLUMN author_id,
DROP COLUMN author_email,
ADD COLUMN display_name text;

-- Update RLS policies to allow anonymous access
DROP POLICY IF EXISTS "Anyone can read posts" ON posts;
DROP POLICY IF EXISTS "Authenticated users can create posts" ON posts;
DROP POLICY IF EXISTS "Authors can delete their own posts" ON posts;
DROP POLICY IF EXISTS "Authors can update their own posts" ON posts;

CREATE POLICY "Enable read access for all users" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON posts
  FOR INSERT WITH CHECK (true);
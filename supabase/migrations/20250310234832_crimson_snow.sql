/*
  # Create posts table for Group 3 pi

  1. New Tables
    - `posts`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `title` (text)
      - `content` (text)
      - `author_id` (uuid, references auth.users)
      - `author_email` (text)

  2. Security
    - Enable RLS on `posts` table
    - Add policies for:
      - Anyone can read posts
      - Authenticated users can create posts
      - Authors can update/delete their own posts
*/

CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  content text NOT NULL,
  author_id uuid REFERENCES auth.users NOT NULL,
  author_email text NOT NULL
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Everyone can read posts
CREATE POLICY "Anyone can read posts"
  ON posts
  FOR SELECT
  USING (true);

-- Authenticated users can create posts
CREATE POLICY "Authenticated users can create posts"
  ON posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

-- Authors can update their own posts
CREATE POLICY "Authors can update their own posts"
  ON posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- Authors can delete their own posts
CREATE POLICY "Authors can delete their own posts"
  ON posts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);
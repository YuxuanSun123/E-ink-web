/*
  # Add delete policy for posts

  1. Changes
    - Add policy to allow anyone to delete any post
*/

CREATE POLICY "Enable delete for all users" ON posts
  FOR DELETE USING (true);
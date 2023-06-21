-- Drop and recreate quizzes table

DROP TABLE IF EXISTS quizzes CASCADE;
CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  visibility boolean,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at DATE,
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  credits INT DEFAULT 3
);

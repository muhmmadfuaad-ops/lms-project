CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  age INT,
  enrollment_date DATE DEFAULT CURRENT_DATE
  phone_number VARCHAR(20),
  address TEXT,
  password VARCHAR(255);
);
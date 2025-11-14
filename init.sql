-- DROP TABLES (safe order for foreign key dependencies)
DROP TABLE IF EXISTS enrollments CASCADE;
DROP TABLE IF EXISTS teachers CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS students CASCADE;

-- CREATE TABLE: students
CREATE TYPE role AS ENUM ('student', 'admin');
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL,
  age INT,
  phone_number VARCHAR(20),
  address VARCHAR(255),
  enrollment_date DATE DEFAULT CURRENT_DATE,
  role role NOT NULL DEFAULT 'student'
);

-- SEED DATA: students
INSERT INTO students (name, username, email, password, age, phone_number, address, role)
VALUES
  ('Ali Khan', 'ali', 'ali@example.com', 'hashed_password_1', 21, '03001234567', 'Islamabad', 'student'),
  ('Sara Ahmed', 'sara', 'sara@example.com', 'hashed_password_2', 23, '03007654321', 'Karachi', 'student'),
  ('Bilal Hussain', 'bilal', 'bilal@example.com', 'hashed_password_3', 20, '03001112223', 'Lahore', 'admin');

-- CREATE TABLE: courses
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  credits INT NOT NULL,
  price INT NOT NULL,
  currency VARCHAR(10) NOT NULL
);

-- CREATE TABLE: teachers
CREATE TABLE teachers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  department VARCHAR(100)
);

-- CREATE TABLE: enrollments
CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id) ON DELETE CASCADE,
  course_id INT REFERENCES courses(id) ON DELETE CASCADE,
  enrollment_date DATE DEFAULT CURRENT_DATE,
  grade VARCHAR(5)
);


-- SEED DATA: courses
INSERT INTO courses (title, description, credits, price, currency)
VALUES
  ('Web Development', 'Learn HTML, CSS, JS, and frameworks', 3, 15000, 'PKR'),
  ('Database Systems', 'SQL, indexing, normalization', 4, 18000, 'PKR'),
  ('AI & Machine Learning', 'ML basics and advanced concepts', 5, 25000, 'PKR');

-- SEED DATA: teachers
INSERT INTO teachers (name, department)
VALUES
  ('Dr. Kamran', 'Computer Science'),
  ('Prof. Ayesha', 'Information Technology'),
  ('Sir Usman', 'Software Engineering');

-- SEED DATA: enrollments
INSERT INTO enrollments (student_id, course_id, grade)
VALUES
  (1, 1, 'A'),
  (1, 2, 'B'),
  (2, 1, 'A'),
  (3, 3, 'A'),
  (2, 3, 'B');


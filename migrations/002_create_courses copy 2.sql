CREATE TABLE courses (
                         id SERIAL PRIMARY KEY,
                         title VARCHAR(100) NOT NULL,
                         description TEXT,
                         credits INT DEFAULT 3,
                         price NUMERIC(10,2) NOT NULL,
                         currency VARCHAR(10) NOT NULL
);
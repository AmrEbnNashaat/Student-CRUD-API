CREATE DATABASE IF NOT EXISTS studentdb;
USE studentdb;
DROP TABLE IF EXISTS students;


CREATE TABLE students (
    StudentID INT NOT NULL AUTO_INCREMENT,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Age INT NOT NULL,
    PRIMARY KEY (StudentID)
);

INSERT INTO students (FirstName, LastName, Age)
VALUES 
  ('Bader', 'Alobaidi', 27),
  ('Amr', 'Nashaat', 25),
  ('Mohammed', 'Al-Dosari', 20),
  ('Nada', 'Al-Ghamdi', 19),
  ('Ahmed', 'Al-Jaber', 23),
  ('Fatimah', 'Al-Mazrou', 21),
  ('Ali', 'Al-Rashidi', 18),
  ('Noura', 'Al-Salem', 20),
  ('Hala', 'Al-Shammari', 22),
  ('Mahmoud', 'El-Masry', 19),
  ('Mariam', 'Hassan', 21),
  ('Youssef', 'Ibrahim', 23),
  ('Aya', 'Kamal', 20),
  ('Omar', 'Khalil', 22),
  ('Laila', 'Mohammed', 21),
  ('Mona', 'Sayed', 18),
  ('Hassan', 'Tawfik', 19),
  ('Yara', 'Yassin', 20);



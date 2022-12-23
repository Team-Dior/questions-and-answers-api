DROP DATABASE IF EXISTS atelier;
CREATE DATABASE atelier;
USE atelier;

CREATE TABLE Products (
  id INT,
  PRIMARY KEY(id)
);

CREATE TABLE Questions (
  id INT AUTO_INCREMENT,
  product_id INT NOT NULL,
  body VARCHAR(10000),
  date_written TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  asker_name VARCHAR(40),
  asker_email VARCHAR(40),
  reported BOOLEAN DEFAULT false,
  helpfulness NUMBER DEFAULT 0,
  PRIMARY KEY(id),
  FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE TABLE Answers (
  id INT AUTO_INCREMENT,
  question_id INT NOT NULL,
  body VARCHAR(10000),
  date_written TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  answerer_name VARCHAR(40),
  answerer_email VARCHAR(40),
  reported BOOLEAN DEFAULT false,
  helpfulness NUMBER DEFAULT 0,
  PRIMARY KEY(id),
  FOREIGN KEY (question_id) REFERENCES Questions(id)
);

CREATE TABLE Photos (
  id INT AUTO_INCREMENT,
  answer_id INT NOT NULL,
  url VARCHAR(2083),
  PRIMARY KEY(id),
  FOREIGN KEY (answer_id) REFERENCES Answers(id)
);

COPY Questions
FROM ''
DELIMITER ','
CSV HEADER;

COPY Answers
FROM ''
DELIMITER ','
CSV HEADER;

COPY Photos
FROM ''
DELIMITER ','
CSV HEADER;
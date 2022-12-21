DROP DATABASE IF EXISTS atelier;
CREATE DATABASE atelier;
USE atelier;

CREATE TABLE Products (
  id INT,
  PRIMARY KEY(id)
);

CREATE TABLE Questions (
  id INT AUTO_INCREMENT,
  body VARCHAR(10000),
  asker_name VARCHAR(40),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  helpfulness NUMBER DEFAULT 0,
  reported BOOLEAN DEFAULT false,
  product_id INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE TABLE Answers (
  id INT AUTO_INCREMENT,
  body VARCHAR(10000),
  answerer_name VARCHAR(40),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  helpfulness NUMBER DEFAULT 0,
  question_id INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (question_id) REFERENCES Questions(id)
);

CREATE TABLE Photos (
  id INT AUTO_INCREMENT,
  url VARCHAR(2083),
  answer_id INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (answer_id) REFERENCES Answers(id)
);

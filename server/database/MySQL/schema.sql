DROP DATABASE IF EXISTS atelier;
CREATE DATABASE atelier;
USE atelier;

-- CREATE TABLE Products (
--   id INT,
--   PRIMARY KEY(id)
-- );

CREATE TABLE Questions (
  id INT AUTO_INCREMENT,
  product_id INT NOT NULL,
  body VARCHAR(10000),
  date_written BIGINT,
  asker_name VARCHAR(40),
  asker_email VARCHAR(40),
  reported BOOLEAN DEFAULT false,
  helpfulness INT DEFAULT 0,
  PRIMARY KEY (id)
  -- FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE TABLE Answers (
  id INT AUTO_INCREMENT,
  question_id INT NOT NULL,
  body VARCHAR(10000),
  date_written BIGINT,
  answerer_name VARCHAR(40),
  answerer_email VARCHAR(40),
  reported BOOLEAN DEFAULT false,
  helpfulness INT DEFAULT 0,
  PRIMARY KEY (id),
  FOREIGN KEY (question_id) REFERENCES Questions(id)
);

CREATE TABLE Photos (
  id INT AUTO_INCREMENT,
  answer_id INT NOT NULL,
  url VARCHAR(2083),
  PRIMARY KEY (id),
  FOREIGN KEY (answer_id) REFERENCES Answers(id)
);


LOAD DATA LOCAL INFILE '/home/officiallywily/hackreactor/rfp2210/seniorPhase/sdc/questions-and-answers-api/csv/questions.csv'
INTO TABLE Questions
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/home/officiallywily/hackreactor/rfp2210/seniorPhase/sdc/questions-and-answers-api/csv/answers.csv'
INTO TABLE Answers
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/home/officiallywily/hackreactor/rfp2210/seniorPhase/sdc/questions-and-answers-api/csv/answers_photos.csv'
INTO TABLE Photos
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- CREATE TABLE Test (
--   id INT AUTO_INCREMENT,
--   product_id INT NOT NULL,
--   body VARCHAR(10000),
--   date_written BIGINT,
--   asker_name VARCHAR(40),
--   asker_email VARCHAR(40),
--   reported BOOLEAN DEFAULT false,
--   helpfulness INT DEFAULT 0,
--   PRIMARY KEY (id)
--   -- FOREIGN KEY (product_id) REFERENCES Products(id)
-- );

-- COPY Questions
-- FROM '/home/officiallywily/hackreactor/rfp2210/seniorPhase/sdc/questions-and-answers-api/csv/questions.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY Answers
-- FROM '/home/officiallywily/hackreactor/rfp2210/seniorPhase/sdc/questions-and-answers-api/csv/answers.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY Photos
-- FROM '/home/officiallywily/hackreactor/rfp2210/seniorPhase/sdc/questions-and-answers-api/csv/answers_photos.csv'
-- DELIMITER ','
-- CSV HEADER;
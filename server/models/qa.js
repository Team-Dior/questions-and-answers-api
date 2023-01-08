const { db } = require('../database/MySQL');
const Promise = require('bluebird');

module.exports = {
  getQuestionsList: ({ product_id, page, count }) => {
    let data = { product_id };
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT id AS question_id, body AS question_body, date_written AS question_date, asker_name, helpfulness AS question_helpfulness, reported
        FROM Questions
        WHERE product_id = ${product_id} AND id > ${(page - 1) * count} AND id < ${(page * count) + 1}`,
        (err, results, fields) => {
          if(err) {
            reject('error in Questions table query', err);
          } else {
            resolve(results);
          }
        }
      )
    })
    .then((result) => {
      result.forEach((questionObj) => {
        questionObj.answers = {};
        questionObj.question_date = new Date(questionObj.question_date);
        questionObj.reported = questionObj.reported ? true : false;
      })
      return Promise.all(
        result.map(async (questionObj) => {
          await new Promise((resolve, reject) => {
            db.query(
              `SELECT id, body, date_written AS date, answerer_name, helpfulness
              FROM Answers
              WHERE question_id = ${questionObj.question_id}`,
              (err, answers, fields) => {
                if (err) {
                  reject('error in Answers table query', err);
                } else {
                  resolve(answers);
                }
              }
            )
          })
          .then((answers) => {
            answers.forEach((answerObj) => {
              questionObj.answers[answerObj.id] = answerObj;
              questionObj.answers[answerObj.id].photos = [];
              answerObj.date = new Date(answerObj.date);
              answerObj.reported = answerObj.reported ? true : false;
            })
          })
          .catch((err) => err)
        })
      ).then(() => {
        data.results = result;
        return data
      })
      .catch((err) => err)
    })
  },
  addQuestion: ({body, name, email, product_id, dateTime}) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO Questions (product_id, body, date_written, asker_name, asker_email)
      VALUES ("${product_id}", "${body}", "${dateTime}", "${name}", "${email}")`,
      (err) => {
        if (err) {
          reject('error in Questions table query', err);
        }
        resolve();
      })
    })
  },
  markQuestionHelpful: (question_id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE Questions SET helpfulness = helpfulness + 1 WHERE id = ${question_id}`,
      (err) => {
        if (err) {
          reject('error in Questions table query', err);
        }
        resolve();
      })
    })
  },
  reportQuestion: (question_id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE Questions SET reported = 1 WHERE id = ${question_id}`,
      (err) => {
        if (err) {
          reject('error in Questions table query', err);
        }
        resolve();
      })
    })
  },
  getAnswersList: ({ question_id, page, count }) => {
    let data = { "question": question_id, page, count }
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT id AS answer_id, body, date_written AS date, answerer_name, helpfulness
        FROM Answers
        WHERE question_id = ${question_id} AND id > ${(page - 1) * count} AND id < ${(page * count) + 1}`,
        (err, results, fields) => {
          if(err) {
            reject('error in Answers table query', err);
          } else {
            resolve(results);
          }
        }
      )
    }).then((result) => {
      result.forEach((answerObj) => {
        answerObj.date = new Date(answerObj.date);
      })
      return Promise.all(
        result.map(async (answerObj) => {
          await new Promise((resolve, reject) => {
            db.query(`SELECT id, url FROM Photos WHERE answer_id = ${answerObj.answer_id}`,
            (err, results, fields) => {
              if(err) {
                reject('error in Photos table query', err);
              } else {
                resolve(results);
              }
            })
          })
          .then((photos) => {
            answerObj.photos = photos;
          })
          .catch((err) => err)
        })
      ).then(() => {
        data.results = result;
        return data;
      })
      .catch((err) => err)
    })
  },
  addAnswer: ({question_id, body, name, email, photos, dateTime}) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO Answers (question_id, body, date_written, answerer_name, answerer_email)
      VALUES ("${question_id}", "${body}", "${dateTime}", "${name}", "${email}")`,
      (err, result) => {
        if (err) {
          reject('error in Questions table query', err);
        } else {
          resolve(result)
        }
      })
    })
    .then((result) => {
      const inserted_id = result.insertId
      Promise.all(
        photos.map(async (url) => {
          await new Promise((resolve, reject) => {
            db.query(
              `INSERT INTO Photos (answer_id, url)
              VALUES ("${inserted_id}","${url}")`,
              (err, answers, fields) => {
                if (err) {
                  reject('error in Photos table query', err);
                }
                resolve();
              }
            )
          })
          .catch((err) => err)
        })
      )
    })
  },
  markAnswerHelpful: (answer_id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE Answers SET helpfulness = helpfulness + 1 WHERE id = ${answer_id}`,
      (err) => {
        if (err) {
          reject('error in Answers table query', err);
        }
        resolve();
      })
    })
  },
  reportAnswer: (answer_id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE Answers SET reported = 1 WHERE id = ${answer_id}`,
      (err) => {
        if (err) {
          reject('error in Answers table query', err);
        }
        resolve();
      })
    })
  },
}

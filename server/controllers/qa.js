const models = require('../models');

module.exports = {
  listQuestions: (req, res) => {
    const product_id = req.query.product_id;
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    models.qa.getQuestionsList({product_id, page, count})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.status(500).send(err));
  },
  addQuestion: (req, res) => {
    const body = req.body.body || 'Just a test body';
    const name = req.body.name || 'Test Name';
    const email = req.body.email || 'test@email.com';
    const product_id = req.body.product_id || 1;
    const dateTime = Math.floor(Date.now());
    models.qa.addQuestion({body, name, email, product_id, dateTime})
    .then(() => res.sendStatus(201))
    .catch((err) => res.status(500).send(err));
  },
  markQuestionHelpful: (req, res) => {
    const question_id = req.params.question_id;
    models.qa.markQuestionHelpful(question_id)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err)});
  },
  reportQuestion: (req, res) => {
    const question_id = req.params.question_id;
    models.qa.reportQuestion(question_id)
    .then(() => res.sendStatus(201))
    .catch((err) => res.status(500).send(err));
  },

  // Answers
  listAnswers: (req, res) => {
    const question_id = req.params.question_id;
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    models.qa.getAnswersList({question_id, page, count})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.sendStatus(500).send(err));
  },
  addAnswer: (req, res) => {
    const question_id = req.params.question_id;
    const body = req.body.body || 'Just a test body';
    const name = req.body.name || 'Test Name';
    const email = req.body.email || 'test@email.com';
    const photos = req.body.photos || ["https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80", "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80"];
    const dateTime = Math.floor(Date.now() / 1000);
    models.qa.addAnswer({question_id, body, name, email, photos, dateTime})
    .then(() => res.sendStatus(201))
    .catch((err) => res.status(500).send(err));
  },
  markAnswerHelpful: (req, res) => {
    const answer_id = req.params.answer_id;
    models.qa.markQuestionHelpful(answer_id)
    .then(() => res.sendStatus(201))
    .catch((err) => res.status(500).send(err));
  },
  reportAnswer: (req, res) => {
    const answer_id = req.params.answer_id;
    models.qa.reportAnswer(answer_id)
    .then(() => res.sendStatus(201))
    .catch((err) => res.status(500).send(err));
  },
}
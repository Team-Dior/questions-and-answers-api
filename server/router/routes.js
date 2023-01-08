const controllers = require('../controllers');
const router = require('express').Router();

router.get('/questions', controllers.qa.listQuestions);
router.get('/questions/:question_id/answers', controllers.qa.listAnswers);
router.post('/questions', controllers.qa.addQuestion);
router.post('/questions/:question_id/answers', controllers.qa.addAnswer);
router.put('/questions/:question_id/helpful', controllers.qa.markQuestionHelpful);
router.put('/questions/:question_id/report', controllers.qa.reportQuestion);
router.put('/answers/:answer_id/helpful', controllers.qa.markAnswerHelpful);
router.put('/answers/:answer_id/report', controllers.qa.reportAnswer);

module.exports = router;
require("dotenv").config();
const mongoose, { Schema } = require('mongoose');

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`);

const questionSchema = new Schema({
  body: String,
  date: { type: Date, default: Date.now },
  asker_name: String,
  helpfulness: { type: Number, default: 0 },
  reported: { type: Boolean, default: false },
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
});
const answerSchema = new Schema({
  body: String,
  date: { type: Date, default: Date.now },
  answerer_name: String,
  helpfulness: { type: Number, default: 0 },
  photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }]
});
const photoSchema = new Schema({
  url: String
});

const Question = mongoose.model('Question', questionSchema);
const Answer = mongoose.model('Answer', answerSchema);
const Photo = mongoose.model('Photo', photoSchema);

module.exports = { Question, Answer, Photo };

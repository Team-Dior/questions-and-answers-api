require("dotenv").config();
const mongoose, { Schema } = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  try {
    await mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`);
    console.log('Connected to Database \n\n');
    let questionSchema = new Schema({
      body: String,
      date: { type: Date, default: Date.now },
      asker_name: String,
      helpfulness: { type: Number, default: 0 },
      reported: { type: Boolean, default: false },
      answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
    });
    let answerSchema = new Schema({
      body: String,
      date: { type: Date, default: Date.now },
      answerer_name: String,
      helpfulness: { type: Number, default: 0 },
      photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }]
    });
    let photoSchema = new Schema({
      url: String
    });

    const Question = mongoose.model('Question', questionSchema);
    const Answer = mongoose.model('Answer', answerSchema);
    const Photo = mongoose.model('Photo', photoSchema);

    module.exports = { Question, Answer, Photo };
  } catch (err) {
    console.log('error: ' + err);
  }
}


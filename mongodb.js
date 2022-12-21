// Questions

{
  body: {
    type: String
  },
  date: {
    type: Date
  },
  asker_name: {
    type: String
  },
  helpfulness: {
    type: Integer
  },
  reported: {
    type: Boolean
  },
  answers: [answers]
}

// Answers

{
  body: {
    type: String
  },
  date: {
    type: Date
  },
  answerer_name: {
    type: String
  },
  helpfulness: {
    type: Integer
  },
  photos: [photos]
}

// Photos

{
  url: {
    type: String
  }
}
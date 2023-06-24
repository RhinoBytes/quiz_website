
const express = require('express');
const router  = express.Router();
const db = require('../db/connection');



router.post('/create_quiz', (req, res) => {
  console.log(req);
  const quizTitle = req.body["quiz-title"];
  const quizDescription = req.body["quiz-desc"];
  console.log("hello");
  // create an array to store the questions and answers
  const questions = [];

  for (let i = 1; i <= 5; i++) {
    const question = req.body['question-' + i];
    const answers = [];

    for (let j = 1; j <= 4; j++) {
      const answer = req.body['answer-' + i + '-' + j];
      answers.push(answer);
    }

    questions.push({question, answers});
  }

  const isPrivate = req.body['private-check'] === 'on';

  const insertQuizQuery = `
  INSERT INTO quizzes (title, description, visibility)
  VALUES ($1, $2, $3)
  returning *;
  `;

  db.query(insertQuizQuery, [quizTitle, quizDescription, isPrivate])
    .then((quizResult) => {
      const quizId = quizResult.rows[0].id;

      const insertQuestionQuery = `
      INSERT INTO questions (quiz_id, question)
      VALUES ($1, $2)
      RETURNING *;
      `;

      const insertAnswerQuery = `
      INSERT INTO choices (question_id, answer)
      VALUES ($1, $2);
      `;


      const questionPromises = questions.map((question) => {
        return db.query(insertQuestionQuery, [quizId, question.question])
          .then((questionResult) => {
            const questionId = questionResult.rows[0].id;

            const answerPromises = question.answers.map((answer) => {
              return db.query(insertAnswerQuery, [questionId, answer]);
            });

            return Promise.all(answerPromises);
          });
      });

      return Promise.all(questionPromises);
    })
    .then(() => {
      res.send('Quiz created successfully!');
    })
    .catch((error) => {
      console.error('Error creating quiz:', error);
      res.status(500).send('Failed to create quiz.');
    });
});


module.exports = router;

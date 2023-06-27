const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

function processFormData(req) {
  const quizTitle = req.body['quiz-title'];
  const quizDesc = req.body['quiz-desc'];
  const username = 'Doug';

  const questions = [];
  for (let i = 1; i <= 5; i++) {
    const question = req.body[`question-${i}`];
    const answers = [];
    let correctAnswer = null;
    for (let j = 1; j <= 4; j++) {
      const answer = req.body[`answer-${i}-${j}`];
      answers.push(answer);
      if (req.body[`correct-answer-${i}`] === `${j}`) {
        correctAnswer = j;
      }
    }
    questions.push({ question, answers, correctAnswer });
  }

  const creationDate = new Date();
  const formattedDate = creationDate.toISOString().split('T')[0];

  const isPrivate = req.body['private-check'] === 'on';

  return {
    quizTitle,
    quizDesc,
    username,
    questions,
    formattedDate,
    isPrivate,
  };
}

router.post('/', async (req, res) => {
  console.log("error post")
  try {
    const {
      quizTitle,
      quizDesc,
      username,
      questions,
      formattedDate,
      isPrivate,
    } = processFormData(req);

    const userId = await db.insertUser(username);
    console.log('User inserted. UserID:', userId);

    const quizId = await db.insertQuiz(
      quizTitle,
      quizDesc,
      isPrivate,
      userId,
      formattedDate
    );
    console.log('Quiz inserted. QuizID:', quizId);

    for (const question of questions) {
      await db.insertQuestion(question.question, quizId);
      console.log('Question inserted:', question.question);
    }
    res.sendStatus(200);

  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

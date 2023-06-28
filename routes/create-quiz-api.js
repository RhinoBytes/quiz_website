const express = require('express');
const router = express.Router();
const db = require('../db/queries/users');

function processFormData(req) {
  const quizTitle = req.body['quiz-title'];
  const quizDesc = req.body['quiz-desc'];
  const user = req.session.username;

  const questions = [];
  //
  for (let i = 1; i <= 5; i++) {
    const question = req.body[`question-${i}`];
    const answers = [];
    let correctAnswerIndex = null;
    for (let j = 1; j <= 4; j++) {
      const answer = req.body[`answer-${i}-${j}`];
      answers.push(answer);
      if (req.body[`correct-answer-${i}`] === `${j}`) {
        correctAnswerIndex = j - 1;
      }
    }
    questions.push({ question, answers, correctAnswer: correctAnswerIndex });
  }

  const creationDate = new Date();
  const formattedDate = creationDate.toISOString().split('T')[0];

  const isPrivate = req.body['private-check'] !== 'on';
  console.log("process form data once")
  return {
    quizTitle,
    quizDesc,
    user,
    questions,
    formattedDate,
    isPrivate,
  };
}

router.post('/', async (req, res) => {
  console.log("insert start once")
  try {
    const {
      quizTitle,
      quizDesc,
      user,
      questions,
      formattedDate,
      isPrivate,
    } = processFormData(req);

    const userId = await db.insertUser(user);
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
      const questionId = await db.insertQuestion(question.question, quizId);
      console.log('Question inserted:', question.question);

      for (let i = 0; i < question.answers.length; i++) {
        const isCorrectAnswer = i === question.correctAnswer;
        await db.insertChoice(question.answers[i], isCorrectAnswer, questionId);
        console.log('Choice inserted:', question.answers[i], 'Is correct:', isCorrectAnswer);
      }
    }
    console.log("inserted once")
    res.status(200).json({quizId});

  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

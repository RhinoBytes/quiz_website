const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const formProcessor = require('../public/scripts/create-quiz')

router.post('/', async (req, res) => { //change here
  try {
    const {
      quizTitle,
      quizDesc,
      username,
      questions,
      formattedDate,
      isPrivate,
    } = formProcessor.processFormData(req);

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

    res.send('Quiz created successfully!');
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

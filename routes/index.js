const express = require('express');
const router = express.Router();
const publicQuizzes = require('../db/queries/index');

router.get('/', (req, res) => {
  Promise.all([
    publicQuizzes.getPublicQuizzes(),
    publicQuizzes.getPublicQuizAttempts()
  ])
    .then(([quizzes, attempts]) => {
      const promises = quizzes.map(quiz =>
        publicQuizzes.getPublicQuizAverageScore(quiz.id)
          .then(averagescore => ({ ...quiz, averagescore }))
      );

      Promise.all(promises)
        .then(results => {
          res.render('index', { results, attempts });
        })
        .catch(error => {
          // Handle the error appropriately
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        });
    })
    .catch(error => {
      // Handle the error appropriately
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

router.post('/login', (req, res) => {
  req.session.username = req.body.username;
});

module.exports = router;

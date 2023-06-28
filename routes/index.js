const express = require('express');
const router = express.Router();
const publicQuizzes = require('../db/queries/index');
const { db } = require('../db/queries/my-quizzes');

router.get('/', (req, res) => {
  console.log(req.session);
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
          const user = req.session.username;
          console.log(user);
          res.render('index', { results, attempts, user });
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




module.exports = router;

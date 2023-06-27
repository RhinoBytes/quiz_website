const express = require('express');
const router = express.Router();
const myQuizzes = require('../db/queries/my-quizzes');

router.get('/all', (req, res) => {
  myQuizzes.getQuizzes()
    .then(quizzes => {
      myQuizzes.getAverageScore()
      .then(averagescore => {
        myQuizzes.getAttempts()
        .then(attempts => {
          res.render('my_quizzes', { quizzes, averagescore, attempts });
        })
      })
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});



module.exports = router;

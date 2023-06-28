const express = require('express');
const router = express.Router();
const myQuizzes = require('../db/queries/my-quizzes');

router.get('/all', (req, res) => {
  const userId = req.session.user_id;  // change from user to user_id
  myQuizzes.getQuizzes(userId)
    .then(quizzes => {
      myQuizzes.getAverageScore()
      .then(averagescore => {
        myQuizzes.getAttempts()
        .then(attempts => {
          const user = req.session.username;
          res.render('my_quizzes', { quizzes, averagescore, attempts, user });
        })
      })
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});



module.exports = router;

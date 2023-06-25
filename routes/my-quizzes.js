const express = require('express');
const router = express.Router();
const myQuizzes = require('../db/queries/my-quizzes');

router.get('/all', (req, res) => {
  const userId = req.session.user_id;
  if(!userId) {
    res.send("You are not logged");
    return;
  }
  myQuizzes.getQuizzes(userId)
    .then(quizzes => {
      console.log("Quizzes:", quizzes);
      myQuizzes.getAverageScore()
      .then(averagescore => {
        myQuizzes.getAttempts()
        .then(attempts => {
          const user = req.session.username;
          res.render('my_quizzes', { quizzes, averagescore, attempts,user }); //my_quizzes is referring to my-quizzes.ejs file
        })
      })
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});



module.exports = router;

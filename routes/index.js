const express = require('express');
const router = express.Router();
const publicQuizzes = require('../db/queries/index');


router.get('/', (req, res) => {
  publicQuizzes.getPublicQuizzes()
    .then(quizzes => {
      const results = [];
      for(let quiz of quizzes) {
        console.log(quiz);
        publicQuizzes.getPublicQuizAverageScore(quiz.id)
      .then(averagescore => {
        console.log(averagescore);
        results.push({...quiz, averagescore })
        console.log(results);
      })
      }

        publicQuizzes.getPublicQuizAttempts()
        .then(attempts => {
          res.render('index', { results, attempts });
      })
    })
    .catch(error => {
      // Handle the error appropriately
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

router.post('/login', (req,res) => {
  req.session.username = req.body.username;
})





module.exports = router;

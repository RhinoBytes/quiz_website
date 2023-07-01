const express = require('express');
const router = express.Router();
const publicQuizzes = require('../db/queries/index');
const { db } = require('../db/queries/my-quizzes');

router.get('/', (req, res) => {
  Promise.all([
    publicQuizzes.getPublicQuizzes(), // Fetch public quizzes from the database
  ])
    .then(([quizzes, attempts]) => {
      const promises = quizzes.map(quiz =>
        publicQuizzes.getPublicQuizAverageScore(quiz.id)
          .then(averagescore => ({ ...quiz, averagescore }))
      );

      Promise.all(promises)
        .then(results => {
          const user = req.session.username;
          res.render('index', { results, attempts, user}); //here index is referring to index.ejs file
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

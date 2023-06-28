const express = require('express');
const router = express.Router();
const publicQuizzes = require('../db/queries/index');

router.get('/', (req, res) => {
  Promise.all([
    publicQuizzes.getPublicQuizzes(),
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
          res.render('index', { results, attempts, user }); //here index is referring to index.ejs file
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
  req.session.username = req.body.username; //query the database for user whose name matches req.body.user, if there is a match then set another session if its not there, then insert that in the database and pull the resulting id.
  res.redirect('/')
});

module.exports = router;

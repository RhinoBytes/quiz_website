const express = require('express');
const router = express.Router();
const myQuizzes = require('../db/queries/my-quizzes');

router.get('/all', (req, res) => {
  const userId = req.session.user_id;
  if (!userId) {
    res.send("You are not logged");
    return;
  }
  // Fetch quizzes for the user
  myQuizzes.getQuizzes(userId)
    .then(quizzes => {

      // Create an array of promises for average scores of each quiz
      const averageScorePromises = quizzes.map(quiz => myQuizzes.getAverageScore(quiz.id));

      // Create an array of promises for attempts count of each quiz
      const attemptsPromises = quizzes.map(quiz => myQuizzes.getAttempts(quiz.id));

      // Wait for all average score promises to resolve
      Promise.all(averageScorePromises)
        .then(averageScores => {
          // Wait for all attempts promises to resolve
          Promise.all(attemptsPromises)
            .then(attempts => {
              const user = req.session.username;
              // Combine quizzes with their respective average scores and attempts
              const quizzesWithStats = quizzes.map((quiz, index) => ({
                ...quiz,
                averagescore: averageScores[index],
                attempts: attempts[index]
              }));
              // Render the 'my_quizzes' template with the updated quizzes and user data
              res.render('my_quizzes', { quizzes: quizzesWithStats, user });
            })
            .catch(error => {
              console.error(error);
              res.status(500).json({ error: 'Internal Server Error' });
            });
        })
        .catch(error => {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

module.exports = router;


/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const db = require('../db/connection')

router.get('/:id', (req, res) => {
  const quizId = req.params.id;

  // Query to fetch questions for the quiz
  const questionsQuery = `
    SELECT * FROM questions
    WHERE quiz_id = $1
  `;
  const questionsPromise = db.query(questionsQuery, [quizId]);

  // Query to fetch choices for the questions
  const choicesQuery = `
    SELECT * FROM choices
    WHERE question_id IN (
      SELECT id
      FROM questions
      WHERE quiz_id = $1
    )
  `;
  const choicesPromise = db.query(choicesQuery, [quizId]);

  // Execute both queries in parallel using Promise.all
  Promise.all([questionsPromise, choicesPromise])
    .then(results => {
      const questionsResult = results[0];
      const choicesResult = results[1];

      // Extract the fetched data
      const quizData = questionsResult.rows;
      const choicesData = choicesResult.rows;
      const user = req.session.username;

      // Render the quiz page with the fetched data and quizId
      res.render('quiz', { quiz: quizData, choices: choicesData, quizId: quizId, user: user });
    })
    .catch(error => {
      console.error('Error fetching quiz data:', error);
      res.status(500).json({ error: 'Failed to fetch quiz data', details: error.message });
    });
});


router.post('/:id', (req, res) => {
  const quizId = req.params.id;
  const userId = req.session.user_id;

  const correctAnswersQuery = `
  SELECT * FROM choices
  JOIN questions ON questions.id = question_id
  WHERE quiz_id = $1
  AND is_correct_answer = $2
  `;
  db.query(correctAnswersQuery, [quizId, true])
    .then(result => {
      const correctAnswers = result.rows;
      // Assuming the submitted answers are sent in the request body
      const submittedAnswers = req.body.answers;

      // Calculate the score based on the submitted answers
      let score = 0;
      for (const index in submittedAnswers) {

        const selectedChoice = submittedAnswers[index];
        const correctAnswer = correctAnswers[index].answer;

        // Compare the selected choice ID with the correct choice ID
        if (correctAnswer === selectedChoice) {
          score++;
        }
      }
      // Store the result in the database
      const insertResultQuery = `
        INSERT INTO results (user_id, quiz_id, score)
        VALUES ($1, $2, $3)
        RETURNING *
      `;
      const insertResultValues = [userId, quizId, score];
      db.query(insertResultQuery, insertResultValues)
        .then(result => {
          const insertedResult = result.rows[0];

          // redirect the result page with the calculated score
          res.redirect(`/quizzes/result/${insertedResult.id}`)
        })
        .catch(error => {
          console.error('Error storing result:', error);
          res.status(500).json({ error: 'Failed to store result', details: error.message });
        });
    })
    .catch(error => {
      console.error('Error fetching correct answers:', error);
      res.status(500).json({ error: 'Failed to fetch correct answers', details: error.message });
    });
});

router.get('/result/:id', (req, res) => {
  const correctAnswersQuery = `
    SELECT * FROM results
    WHERE id = $1
    `;
  db.query(correctAnswersQuery, [req.params.id])
    .then(results => {
      const result = results.rows[0]
      const user = req.session.username;
      res.render('quiz_results', { quizId: result["quiz_id"], score: result["score"], user: user});
  })
  .catch(error => {
    console.error('Error fetching the result:', error);
    res.status(500).json({ error: 'Failed to fetch the result', details: error.message });
  });
});

module.exports = router;

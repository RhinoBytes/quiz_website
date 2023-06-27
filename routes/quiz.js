/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const db = require('../db/connection')
// const session = require('express-session');

// router.use(session({
//   secret: 'secret',
//   resave: false,
//   saveUninitialized: true
// }));

// router.get('/', (req, res) => {
//   res.send('quiz' + req.params.id);
// });

// router.get('/:id', (req, res) => {
//   res.render('quiz');
// });
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

      // Render the quiz page with the fetched data and quizId
      res.render('quiz', { quiz: quizData, choices: choicesData, quizId: quizId });
    })
    .catch(error => {
      console.error('Error fetching quiz data:', error);
      res.status(500).json({ error: 'Failed to fetch quiz data', details: error.message });
    });
});


router.post('/:id', (req, res) => {
  const quizId = req.params.id;
  const userId = req.session.userId; // Assuming user ID is stored in the session

  // Fetch the correct answers for the quiz
  const correctAnswersQuery = `
    SELECT questions.id AS question_id, choices.id AS choice_id
    FROM questions
    INNER JOIN choices ON questions.id = choices.question_id
    WHERE questions.quiz_id = $1 AND choices.is_correct_answer = TRUE
  `;
  db.query(correctAnswersQuery, [quizId])
    .then(result => {
      const correctAnswers = result.rows;
      // Assuming the submitted answers are sent in the request body
      const submittedAnswers = req.body.answers;

      // Calculate the score based on the submitted answers
      let score = 0;
      for (const questionId in submittedAnswers) {
        const selectedChoiceId = submittedAnswers[questionId];

        // Find the correct choice based on the question ID
        let correctChoice = correctAnswers.find(answer => answer.question_id === parseInt(questionId));

        // Compare the selected choice ID with the correct choice ID
        if (correctChoice && selectedChoiceId === correctChoice.choice_id) {
          score++;
        }
      }

      // Store the result in the database
      const insertResultQuery = `
        INSERT INTO results (user_id, quiz_id, score)
        VALUES ($1, $2, $3)
        RETURNING score
      `;
      const insertResultValues = [userId, quizId, score];
      db.query(insertResultQuery, insertResultValues)
        .then(result => {
          const insertedResult = result.rows[0];

          // Render the result page with the calculated score
          res.render('quiz_results', { score: insertedResult.score, userId: userId });
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




module.exports = router;

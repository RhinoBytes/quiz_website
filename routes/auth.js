const express = require('express');
const router = express.Router();
const { db } = require('../db/queries/my-quizzes');

router.post('/login', (req, res) => {
  const username = req.body.username;
  console.log(username);
  // Check if user already exists
  db.query('SELECT * FROM users WHERE username = $1', [username])
    .then(data => {
      if (data.rows.length > 0) { // User exists
        req.session.user_id = data.rows[0].id;
        req.session.username = username;
        res.redirect('/');
      } else { // User does not exist, so create new user
        db.query('INSERT INTO users (username) VALUES ($1) RETURNING id', [username])
          .then(data => {
            req.session.user_id = data.rows[0].id;
            req.session.username = username;
            console.log(req.session);
            res.redirect('/');
          })
          .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

module.exports = router;

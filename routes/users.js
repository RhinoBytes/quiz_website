/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('users');
});

module.exports = router;




app.get('/') <---- this is to render the homepage


app.get('/api/quiz) <--- this will return a bunch of public quiz



app.post('/createQuiz') <---- Submit the form


app.get('/createQuiz') <--- render new Quiz page with a form in it

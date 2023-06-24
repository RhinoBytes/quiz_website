const express = require('express');
const router  = express.Router();

router.get('/create_quiz', (req, res) => {
  res.render('create_quiz');
});

module.exports = router;

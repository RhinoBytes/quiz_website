const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  const user = req.session.username;
  res.render('create_quiz', {user});
});




module.exports = router;



const db = require('../connection'); //databse connection

const getQuizzes = () => {
  return db.query('SELECT quizzes.title, quizzes.description FROM quizzes WHERE user_id = $1;')
    .then(data => {
      return data.rows;
    });
};

const getAverageScore = (id, userId) => {
  return db.query('SELECT CAST(AVG(score) AS DECIMAL(10,2)) AS average_score FROM results;')
  .then(data => {
    return data.rows[0].average_score;
  });
};

const getAttempts = () => {
  return db.query('SELECT COUNT(*) AS num_attempts FROM attempts;')
  .then(data => {
    return data.rows[0].num_attempts;
  });
};




module.exports = { getQuizzes,getAverageScore, getAttempts };

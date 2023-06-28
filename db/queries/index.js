const db = require('../connection'); //databse connection

const getPublicQuizzes = () => {
  return db.query('SELECT quizzes.*, COUNT(attempts.id) AS num_attempts FROM quizzes LEFT JOIN attempts ON quizzes.id = attempts.quiz_id WHERE visibility = true GROUP BY quizzes.id;')
    .then(data => {
      return data.rows;
    });
};

const getPublicQuizAverageScore = (id) => {
  return db.query('SELECT CAST(AVG(score) AS DECIMAL(10,2)) AS average_score FROM results WHERE quiz_id = $1;', [id])
  .then(data => {
    return data.rows[0].average_score;
  });
};

const getQuizzesByUser = (username) => {
  return db.query('SELECT title, description FROM quizzes WHERE user_id = $1;' , [username])
    .then(data => {
      return data.rows;
    });
}



module.exports = { getPublicQuizzes,getPublicQuizAverageScore, getQuizzesByUser};

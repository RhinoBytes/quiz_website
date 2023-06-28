const db = require('../connection'); //databse connection

const getPublicQuizzes = () => {
  return db.query('SELECT id, title, description FROM quizzes WHERE visibility = $1;', ['t'])
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

const getPublicQuizAttempts = () => {
  return db.query('SELECT COUNT(*) AS num_attempts FROM quizzes JOIN attempts ON quizzes.id = attempts.quiz_id WHERE visibility = $1;', ['t'])
  .then(data => {
    return data.rows[0].num_attempts;
  });
};

const getQuizzesByUser = (username) => {
  return db.query('SELECT title, description FROM quizzes WHERE user_id = $1;' , [username])
    .then(data => {
      return data.rows;
    });
}



module.exports = { getPublicQuizzes,getPublicQuizAverageScore, getPublicQuizAttempts, getQuizzesByUser};

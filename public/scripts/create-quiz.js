// formProcessor.js
function processFormData(req) {
  const quizTitle = req.body['quiz-title'];
  const quizDesc = req.body['quiz-desc'];
  const username = 'Doug';

  const questions = [];
  for (let i = 1; i <= 5; i++) {
    const question = req.body[`question-${i}`];
    const answers = [];
    let correctAnswer = null;
    for (let j = 1; j <= 4; j++) {
      const answer = req.body[`answer-${i}-${j}`];
      answers.push(answer);
      if (req.body[`correct-answer-${i}`] === `${j}`) {
        correctAnswer = j;
      }
    }
    questions.push({ question, answers, correctAnswer });
  }

  const creationDate = new Date();
  const formattedDate = creationDate.toISOString().split('T')[0];

  const isPrivate = req.body['private-check'] === 'on';

  return {
    quizTitle,
    quizDesc,
    username,
    questions,
    formattedDate,
    isPrivate,
  };
}

module.exports = {
  processFormData,
};

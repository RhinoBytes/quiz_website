$(document).ready(function() {
  // Hide all questions except the first one
  $('.question').not(':first').hide();

  // Hide the submit button initially
  $('#submit-btn').hide();

  // Handle next button click
  $('#next-btn').click(function() {
    const currentQuestion = $('.question:visible');
    const nextQuestion = currentQuestion.next('.question');

    // Show next question or submit button if there are no more questions
    if (nextQuestion.length !== 0) {
      currentQuestion.hide();
      nextQuestion.show();
      if (nextQuestion.is(':last-child')) {
        $('#next-btn').hide(); // Hide the next button
        $('#submit-btn').show(); // Show the submit button
      }
    }
  });

  // Handle submit button click
  $('#submit-btn').click(function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const quizId = $(this).data('quizId'); // Get the quiz ID from data attribute
    const formAction = '/quizzes/' + quizId; // Construct the correct form action URL
    $('#quiz-form').attr('action', formAction).submit(); // Set the form action and submit
  });
});

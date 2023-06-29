$(document).ready(function () {
  // Handle submit button click
  // $('#submit-btn').click(function(event) {
  //   event.preventDefault(); // Prevent the default form submission behavior

  // quiz-form.addEventListener('submit', function (event) {
  //   event.preventDefault()
  // Hide all questions except the first one
  $('.question').not(':first').hide();

  // Hide the submit button initially
  $('#submit-btn').hide();

  $('#submit-btn').click(function (event) {
    const currentQuestion = $('.question:visible');
    // const nextQuestion = currentQuestion.next('.question');
    const optionsContainer = currentQuestion.find('.allOptions:checked');
    console.log("optionsContainer>>>>>>>>>>>", optionsContainer);
    if (optionsContainer.length !== 1) {
      event.preventDefault()
      alert('Please select exactly one option.');
      return; // Stop further execution
    }
  });

  // Handle next button click
    $('#next-btn').click(function () {
      const currentQuestion = $('.question:visible');
      const nextQuestion = currentQuestion.next('.question');
      console.log('nextQuestion????????????????????????????', nextQuestion);

      const optionsContainer = currentQuestion.find('.allOptions:checked');
      console.log("optionsContainer>>>>>>>>>>>" ,optionsContainer);
      if (optionsContainer.length !== 1) {
        alert('Please select exactly one option.');
        return; // Stop further execution
      }

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


  //   const quizId = $(this).data('quizid'); // Get the quiz ID from data attribute
  //   const formAction = '/quizzes/result/' + quizId; // Construct the correct form action URL
  //   $('#quiz-form').attr('action', formAction).submit(); // Set the form action and submit
  // });
});

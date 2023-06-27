$(document).ready(function () {

  // Hide all questions except the first one
  $('.question').not(':first').hide();

  // Hide the submit button initially
  $('#submit-btn').hide();

  $('#submit-btn').click(function (event) {
    const currentQuestion = $('.question:visible');
    // const nextQuestion = currentQuestion.next('.question');
    const optionsContainer = currentQuestion.find('.allOptions:checked');
    if (optionsContainer.length !== 1) {
      event.preventDefault()
      $(".error-message").text("🛑 You must choose one answer 🛑").slideDown();
      return; // Stop further execution
    } else {
      $(".error-message").slideUp(); // Hide the error message
    }
  });

  // Handle next button click
    $('#next-btn').click(function () {
      const currentQuestion = $('.question:visible');
      const nextQuestion = currentQuestion.next('.question');

      const optionsContainer = currentQuestion.find('.allOptions:checked');
      console.log("optionsContainer>>>>>>>>>>>" ,optionsContainer);
      if (optionsContainer.length !== 1) {
        $(".error-message").text("🛑 You must choose one answer 🛑").slideDown();
        return; // Stop further execution
      }else {
        $(".error-message").slideUp(); // Hide the error message
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
});

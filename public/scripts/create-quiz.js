$(document).ready(function() {
  $('#quiz-output').submit(function(event) {
    event.preventDefault();  // prevent form from submitting

    var hasError = false;

    // check for errors
    $('.form-input').each(function() {
      if ($(this).val().trim() === '') {
        hasError = true;
        $(this).addClass('error');
      } else {
        $(this).removeClass('error');
      }
    });

    if (hasError) {
      $('#error-message').text('All fields must be filled');
      $('#error-message').show();
    } else {
      // if no errors, submit the form via AJAX then show the modal box
      $.ajax({
        type: 'POST',
        url: '/api/create-quiz',
        data: $('#quiz-output').serialize(),
        success: function(data) {
          showModalBox(data.quizId); // Pass the quizId to the function
        },
        error: function() {
          $('#error-message').text('Failed to create the quiz');
          $('#error-message').show();
        }
      });
    }
  });

  $('.form-input').on('input', function() {
    $(this).removeClass('error');
    $('#error-message').hide();
  });

  function showModalBox(quizId) {
    // Assuming 'quizUrl' is the URL of the quiz
    var quizUrl = `http://localhost:8080/quizzes/${quizId}`;  // Replace this with actual quiz URL

    $('#quizUrl').val(quizUrl);  // Set the quiz URL in the modal

    $('#myModal').modal('show');  // Show the modal using Bootstrap's modal() method

    // Add event handler for modal box close button
    $('#modal-close-button').on('click', function() {
      $('#myModal').modal('hide');  // Hide the modal using Bootstrap's modal() method
    });

    // Add event handler for modal submit button
    $('#modal-submit-button').on('click', function() {
      var email = $('#modal-email-input').val();
      if (email) {
        var mailto_link = 'mailto:' + email + '?subject=Quiz Link&body=' + `I just made a quiz, try it out and let me know what you think! ${quizUrl}`;
        window.location.href = mailto_link;
      }
      // Redirect to the created quiz page
      window.location.href = quizUrl;
    });
  }
});

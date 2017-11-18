$(function () {
  var f = function () {
    var container = $('#scroll-spy-host');
    if (container.is(':visible')) {
      container[$(window).scrollTop() > $('.jumbotron').outerHeight() ? 'addClass' : 'removeClass']('fixed');
    }
  };
  $(window).scroll(f);
  f();
});

function underConstruction() {
  alert('This functionality is not available at this moment. Please check later', 'Under construction');
}

function alert(message, title) {
  var alert = $('.custom-alert');
  alert.find('h4').text(title || '');
  alert.find('p.text').text(message || '');
  alert.show();
}

setTimeout(function () {
  $('#myModal').modal('show');
}, 5000);

function setLoading(state) {
  state ? $('.loading').show() : $('.loading').hide();
}

$('.custom-alert button').click(function () {
  $('.custom-alert').hide();
});

$('form').submit(function (e) {
  var form = $(this),
    sorryTitle = 'We are very sorry, but...',
    sorryMessage = 'Your request is malformed. You should specify at least email and message body to be able to sent an email';

  if (!form.find('#email').val() || !form.find('#text').val()) {
    alert(sorryMessage, sorryTitle);
  }
  else {
    var data = form.serialize();
    setLoading(true);
    $.ajax({
      type: form.attr('method') || 'POST',
      url: form.attr('action'),
      data: data,
      success: function (data) {
        setLoading(false);
        alert('Your email was sent successfully. Our marketing department started processing your request and will call you later', 'Great! Thank you');
        form.trigger('reset');
      },
      error: function (jqXHR, message, status) {
        setLoading(false);
        alert(jqXHR.status === 400 ? sorryMessage : 'The server is busy. Please try again later.', sorryTitle);
      }
    });
  }
  e.preventDefault();
  return false;
});
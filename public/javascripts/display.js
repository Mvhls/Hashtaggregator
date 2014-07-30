$(document).ready(function() {
	
  $('.hashtag-form-modal').show();

	$('#change-hashtag-form').submit(function(){
    event.preventDefault();
    $('.hashtag-form-modal').fadeToggle(400);
	});


});

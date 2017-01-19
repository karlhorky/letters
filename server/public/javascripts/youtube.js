$("#youtube").click(function() {
  $("#youtube").hide();
  var videoURL = $('#youtube-video').prop('src');
  videoURL += "&autoplay=1";
  $('#youtube-video').prop('src',videoURL);
});
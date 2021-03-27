

$(document).ready(function(event) {
  $('#tweet-text').on('input', function() {
    let charLeft = 140;
    let textLength = $(this).val().length; //length of input in textbox
    charLeft -= textLength;
    let newDisplayNum = $('output').val(charLeft); //sets new value of char remaining and assigns <output></output> to variable

    if (charLeft < 0) {
      newDisplayNum.addClass("red-font"); 
    } else {
      newDisplayNum.removeClass("red-font");
    } 

  })
})

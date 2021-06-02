/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
$(document).ready(function() {
  $(this).scrollTop(0); // makes page loads at the top

  const loadTweets = () => {
    $.ajax({
      url: "/tweets/",
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (error) => {
      }
    });
  };

  loadTweets(); //loads initial tweets in history

  //reveals tweet form when clicked
  $("#form-toggle-button").click(function() {
    $(".new-tweet").toggle(700);
  });
  
  //posts tweet to page w/o reloading page & clears text field once loaded
  const $postTweet = $('form.new-tweet');
  const $textarea = $('textarea');
  $postTweet.on("submit", function(event) {
    event.preventDefault();
    if ($textarea.val().length === 0) {
      $('.error-empty').slideDown(600).delay(1500).slideUp(600);
      return;
    } else if ($textarea.val().length > 140) {
      $('.error-long').slideDown(600).delay(1500).slideUp(600);
      return;
    }
    const serializedTweet = $(this).serialize();
    $.post('/tweets', serializedTweet)  //$.post is shortened form of jquery ajax post request
      .then((response) => {
        loadTweets();
        $('textarea').val(''); //clears tweet text field once tweet is posted
        $('output').val(140); //resets char counter to 140 once tweet is posted
      });
  });

  //for security! posts will be posted as straight text, and won't manipulate website data. Need to use on all user input data fields
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  //grabs all info needed from our tweet text box.
  const createTweetElement = (tweetData) => {
    const $tweet = `
    <article class="tweet">
      <header>
        <img src="${escape(tweetData.user.avatars)}">
        <div class="username">${escape(tweetData.user.name)}</div>
        <div class="user-handle">${escape(tweetData.user.handle)}</div>
      </header> 
      <p class="tweet-message">${escape(tweetData.content.text)}</p>
      <footer>
        <div class="days-ago">${moment(tweetData.created_at).fromNow()}</div>
        <div class=icons>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>`;
    return $tweet;
  };

  //loops through tweets and passes through createTweetElement and adds it to our posts timeline
  const renderTweets = (tweets) => {
    const $tweetsContainer = $('#tweets-container');
    $tweetsContainer.empty();  //empties tweets already posted so they won't get posted again
    for (let tweet of tweets) {
      let $tweetHTML = createTweetElement(tweet);
      $('#tweets-container').prepend($tweetHTML);
    }
  };
});

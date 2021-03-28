/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
$(document).ready(function() {

  const loadTweets = () => {
    $.ajax({
      url: "/tweets/",
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        renderTweets(tweets)
      },
      error: (error) => {
        console.error(error);
      }
    });
  };

  //posts tweet to page w/o reloading page & clears text field once loaded
  const $postTweet = $('form.new-tweet');
  $postTweet.on("submit", function (event) {
    event.preventDefault();
    const serializedTweet = $(this).serialize();
    $.post('/tweets', serializedTweet)  //$.post is shortened form of jquery ajax post request
    .then((response) => {
      getTweets();
      $('textarea').val(''); //clears tweet text field once tweet is posted
    })
  });
  

const createTweetElement = (tweetData) => {
  const $tweet = `
  <article class="tweet">
  <header>
    <img src="https://i.imgur.com/nlhLi3I.png">
    <div class="name">Rhoda Jacobs</div>
    <div class="handle" class='hover'>@MsJacobs</div>
  </header> 
  <p>${tweetData.content.text}</p>
  <footer>
    <div class=days-ago>10 days ago</div>
    <div class=icons>
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
</article>`;
  return $tweet;
}


const renderTweets = (tweets) => {
  const $tweetsContainer = $('#tweets-container');
  $tweetsContainer.empty();
  for (let tweet of tweets) {
    let $tweetHTML = createTweetElement(tweet);
    $('#tweets-container').append($tweetHTML);
  }
}

})
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
$(document).ready(function() {
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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


const renderTweets = (arrTweetObj) => {
  for (let tweetObj of arrTweetObj) {
    let $tweetHTML = createTweetElement(tweetObj);
    $('#tweets-container').append($tweetHTML);
  }
}



renderTweets(data);
})
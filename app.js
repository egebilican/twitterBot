var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);

// Set up your search parameters
var params = [
  {
    q: '#vegan',
    count: 10,
    result_type: 'recent'
  },
  {
    q: '#morissey',
    count: 10,
    result_type: 'recent'
  }
];

//TODO: duzgun calisiyor mu bak

for (i = 0; i < params.length; i++) {
  // Initiate your search using the above paramaters
  T.get('search/tweets', params[i], function(err, data, response) {
    // If there is no error, proceed
    if (!err) {
      // Loop through the returned tweets
      for (let i = 0; i < data.statuses.length; i++) {
        // Get the tweet Id from the returned data
        let id = { id: data.statuses[i].id_str };
        let text = { status: data.statuses[i].text };
        console.log(text.status);

        //retweet(id)
        //fav(id)
        post(text.status);
      }
    } else {
      console.log(err);
    }
  });
}

function retweet(id) {
  T.post('statuses/retweet', { id: id.id }, function(err, resp) {
    if (err) {
      console.log(err);
    } else {
      console.log('retweeted', id);
    }
  });
}

function fav(id) {
  T.post('favorites/create', id, function(err, response) {
    // If the favorite fails, log the error message
    if (err) {
      console.log(err[0].message);
    }
    // If the favorite is successful, log the url of the tweet
    else {
      let username = response.user.screen_name;
      let tweetId = response.id_str;
      console.log(
        'Favorited: ',
        `https://twitter.com/${username}/status/${tweetId}`
      );
    }
  });
}

function post(text) {
  T.post('statuses/update', { status: text }, function(err, resp) {
    if (err) {
      console.log(err);
    } else {
      console.log('posted: ', text);
    }
  });
}

// const express = require('express')
// const app = express()

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(3000, () => console.log('Example app listening on port 3000!'))

const Twitter = require('twitter');
const config = require('./config.js');
const T = new Twitter(config);


function routes(app) {
  app.get("/", function(req, res) {
    res.status(200).send("kanalima hosgeldiniz");
  });

  app.get('/search/:searchTerm', (req, res) => {
    searchTweet(req.params.searchTerm, data =>
      res.status(200).send({id:data.id_str, text:data.text, user: data.user.screen_name})
    );
  });

  app.get('/retweet/:tweetId', (req, res) => {
    console.log(req.params.tweetId)
    retweet(req.params.tweetId, () =>
      res.status(200).send('retweeted ' + req.params.tweetId)
    );
  });
}



function searchTweet(query, callback) {
  T.get('search/tweets', {q: '#'+query, count:1}, function(err, data, response) {
    // If there is no error, proceed
    console.log('FETCHING  FOR : ', query);
    if (!err) {
      console.log('bi seyler geldi')
      console.log(data)
      // Loop through the returned tweets
      for (let j = 0; j < data.statuses.length; j++) {
        // Get the tweet Id from the returned data
        console.log('RESULTS FOR : ', query);
        console.log(j, text.status);

        //retweet(id);
        //fav(id)
        //post(text.status);
        callback(data.statuses[0]);

      }
    } else {
      console.log(err);
    }
  });  
}

//TODO: DUZELT BUNU
function retweet(id) {
T.post('statuses/retweet', { id: id }, function(err, resp) {
  console.log('trying to retweet', id)
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


module.exports = routes;

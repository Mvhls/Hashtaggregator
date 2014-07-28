var MAP_IMAGE_LAYER_PATTERN = 'http://{s}.tiles.mapbox.com/v3/mvhls.j254m1nf/{z}/{x}/{y}.png';

function Tweet(twitterTweet){
  this.username = twitterTweet.username
  this.content = twitterTweet.content,
  this.latitude = twitterTweet.latitude
  this.longitude = twitterTweet.longitude,
  this.twitter_id = twitterTweet.twitter_id,
  this.location = twitterTweet.location,
  this.stars = twitterTweet.stars
}

// $(document).ready(function () {

    function Tweet(tweet) {
        this.id = tweet.id;
        this.username = tweet.username;
        this.content = tweet.content;
        this.latitude = tweet.latitude;
        this.longitude = tweet.longitude;
        this.stars = tweet.stars;
    }

    // function buildMap() {
        var map = L.map('map', {
            center: [41.84, -87.65],
            zoom: 5,
            scrollWheelZoom: true
            // zoomControl: false
        });

        L.tileLayer(MAP_IMAGE_LAYER_PATTERN, {
            maxZoom: 18,
            minZoom: 3
        }).addTo(map);
    // }

    // not tested
    function processTweet(tweet) {
        tweetObject = createTweetObject(tweet);
        display(tweetObject);
        // not tested
        // tweetArray.push(aTweet);
    }

    // tested
    function createTweetObject(tweet) {
        aTweet = new Tweet(tweet);
        return aTweet;
    }

    // not tested
    function display(tweet) {
        L.circleMarker([tweet.latitude, tweet.longitude], {
            radius: 7,
            color: '#486',
            fillColor: '#7b9',
            fillOpacity: 0.75
        }).addTo(map)
            .bindPopup("<a href='https://twitter.com/" + tweet.username + "'>@" + tweet.username + "</a>" + " said: " + tweet.content);
    }

// });

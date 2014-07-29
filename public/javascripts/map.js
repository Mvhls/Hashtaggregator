var MAP_IMAGE_LAYER_PATTERN = 'http://{s}.tiles.mapbox.com/v3/zpfled.j3937a4o/{z}/{x}/{y}.png';
var circleRadius = 7;
var darkGreen = '#486';
var lightGreen = '#7b9';
var darkOrange = '#f60';
var lightOrange = '#fa6';

// function Tweet(twitterTweet){
//   this.username = twitterTweet.username
//   this.content = twitterTweet.content,
//   this.latitude = twitterTweet.latitude
//   this.longitude = twitterTweet.longitude,
//   // this.twitter_id = twitterTweet.twitter_id,
//   this.location = twitterTweet.location,
//   this.stars = twitterTweet.stars
// }

// not tested
// Tweet.prototype.doesContainText = function (text) {
//     var propertyName, property;
//     for (propertyName in this) {
//         if (this.hasOwnProperty(propertyName)) {
//             property = this[propertyName];
//             if (property.toString().indexOf(text) >= 0) {
//                 return true;
//             }
//         }
//     }
//     return false;
// }

// function App() {
//     this.tweets = [];
// }

// App.prototype.addTweet = function (tweetData) {
//     this.tweets.push(new Tweet(tweetData));
//     return this;
// }


// app = new App();


// $(document).ready(function () {

    function Tweet(tweet) {
        this.id = tweet.id;
        this.username = tweet.username;
        this.content = tweet.content;
        this.latitude = tweet.latitude;
        this.longitude = tweet.longitude;
        this.stars = tweet.stars;
    }

    var map = L.map('map', {
        center: [41.84, -87.65],
        zoom: 5,
        scrollWheelZoom: true,
        worldCopyJump: true
    });

    L.tileLayer(MAP_IMAGE_LAYER_PATTERN, {
        maxZoom: 18,
        minZoom: 3,
    }).addTo(map);

    // not tested
    function processTweet(tweetData) {
        tweet = new Tweet(tweetData);
        display(tweet);
        // return tweet;
    }

    // not tested
    function display(tweet) {
        L.circleMarker([tweet.latitude, tweet.longitude], {
            radius: circleRadius,
            color: darkOrange,
            fillColor: lightOrange,
            fillOpacity: 0.5
        }).addTo(map)
            .bindPopup(formatTweet(tweet));
    }

    // tested
    function formatTweet(tweet) {
        return "<a href='https://twitter.com/" + tweet.username + "'>@" + tweet.username + "</a> said: <p class='tweet-popup'>" + tweet.content + "</p><h4>Favorites and Retweets: " + tweet.stars + "</h4>";
    }

// });

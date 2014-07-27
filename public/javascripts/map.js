var MAP_IMAGE_LAYER_PATTERN = 'http://{s}.tiles.mapbox.com/v3/mvhls.j254m1nf/{z}/{x}/{y}.png';
var ArrayMap = [].map;

function Tweet(content, username, latitude, longitude, id) {
    this.id = id;
    this.username = username;
    this.content = content;
    this.latitude = latitude;
    this.longitude = longitude;
}

// var tweetArray = [];

// $(document).ready(function () {

    var map = L.map('map', {
        center: [41.84, -87.65],
        zoom: 5,
        scrollWheelZoom: true
        // zoomControl: false
    });

    L.tileLayer(MAP_IMAGE_LAYER_PATTERN, {
        maxZoom: 18,
    }).addTo(map);

    // function cycleTweets(tweets) {
    //     console.log('cycleTweets ' + tweets);
    //     console.log('cycling them tweets...starting at #' + tweets.length);
    //     for (key in tweets) {
    //         createTweetObject(tweets[key], key);
    //     }
    // }

    function createTweetObject(tweet) {
        aTweet = new Tweet(tweet.content, tweet.username, tweet.latitude , tweet.longitude, tweet.id);
        display(aTweet);
        // tweetArray.push(aTweet);
    }


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

var MAP_IMAGE_LAYER_PATTERN = 'http://{s}.tiles.mapbox.com/v3/mvhls.j254m1nf/{z}/{x}/{y}.png';
var ArrayMap = [].map;

function Tweet(full_text, handle, latitude, longitude, id) {
    this.id = id;
    this.handle = handle;
    this.full_text = full_text;
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
        L.circle([tweet.latitude, tweet.longitude], 5000, {
            color: '#484',
            fillColor: '#7b7',
            fillOpacity: 0.5
        }).addTo(map)
            .bindPopup(tweet.username + " said: " + tweet.content);
    }

// });

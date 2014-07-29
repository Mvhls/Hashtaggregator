var MAP_IMAGE_LAYER_PATTERN = 'http://{s}.tiles.mapbox.com/v3/zpfled.j3937a4o/{z}/{x}/{y}.png';
var POPULAR = 75;
var circleRadius = 7;
var darkCool = '#468';
var lightCool = '#0cf';
var darkWarm = '#f60';
var lightWarm = '#fa6';
window.searchArray = [];

function Tweet(tweet) {
    this.id = tweet.id;
    this.username = tweet.username;
    this.content = tweet.content;
    this.latitude = tweet.latitude;
    this.longitude = tweet.longitude;
    this.stars = tweet.stars;
}

window.map = L.map('map', {
    center: [40.7127, -74.0059],
    zoom: 4,
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
    window.searchArray.push(tweet);
    return tweet;
}

// not tested
function display(tweet) {
    L.circleMarker([tweet.latitude, tweet.longitude], {
        radius: circleRadius,
        color: (tweet.stars > POPULAR ? darkWarm : darkCool),
        fillColor: (tweet.stars > POPULAR ? lightWarm : lightCool),
        fillOpacity: (tweet.stars > POPULAR ? .9 : .6)
    }).addTo(map)
        .bindPopup(formatTweet(tweet));
}

// tested
function formatTweet(tweet) {
    return "<a href='https://twitter.com/" + tweet.username + "'>@" + tweet.username + "</a> said: <p class='tweet-popup'>" + tweet.content + "</p><h4>Favorites and Retweets: " + tweet.stars + "</h4>";
}

// not tested
$("#search-tweets").on("click", "a", function(event) {
    event.preventDefault()
    var params = [];
    var paramsFloat = []
    params = event.target.attributes[0].value.split(',')
    $.each(params, function( index, value) {
        paramsFloat.push(parseFloat(value))
    })
    map.setView(new L.LatLng(params[1], params[0]), zoom = 18, animate = true)
})

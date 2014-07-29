var express = require('express');
var path = require('path');
var port = process.env.PORT || 3888;
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pg = require('pg');
var routes = require('./routes/index');
// var events = require('events');
// var eventEmitter = new events.EventEmitter().listen(3001);
// Custom Query Functions
var getAllTweetsFromDB = require('./tasks/getAllTweetsFromDB');
var getNewTweets = require('./tasks/getNewTweets');
var getLastTweetID = require('./tasks/getLastTweetID');
var TWEET_SENDING_DELAY = 5;
var initialTweets;

// run stream
var stream = require('./runStream');


var app = new express()
,   http = require('http')
,   server = http.createServer(app)
,   io = require('socket.io').listen(server);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

// Server

// heroku starts the file

// listen for connections from clients
io.sockets.on('connection', function(client) {
    var lastTweetID = 0;
    console.log('client connected...');

    // on connection, get all tweets from db
    getAllTweetsFromDB(null, function(err, results) {
        if(err) return console.error(err);
        console.log('getting all tweets from db...')
        initialTweets = results;
    })

    // on 'ready', serve all the tweets from the db
    client.on('ready', function() {
        console.log('client ready...')

        function streamTweetsTo(Tweets, Client) {
            (function streamRemainingTweets() {
                // var tweet = Tweets.pop();
                // console.log(tweet)
                if (Tweets.length) {
                    Client.emit('sendTweets', Tweets.pop());
                    setTimeout(streamRemainingTweets, TWEET_SENDING_DELAY);
                }
            })();
        }

        streamTweetsTo(initialTweets, client);

        // initialTweets.forEach(function(tweet) {
        //     // console.log('send tweet #' + tweet.id);
        //     client.emit('sendTweets', tweet);
        //     setTimeout(console.log('...done.'), 1000);
        // })

        // process.emit('initialized', 'tweets');

        // save id of last tweet sent to client on connection
        getLastTweetID(function(err, id) {
            if (err) return console.error(err);
            lastTweetID = id;
        });
    })

    // periodically check db for new tweets

    // console.log('here');
    // process.on('initialized', function(tweets) {
    //     console.log(tweets);
    //     setInterval(sendNewTweets, 200);
    // })

    function sendNewTweets() {
        console.log('about to get new tweets...')
        getNewTweets(null, lastTweetID, function(err, newTweets) {
            if(err) return console.error(err);
            // send tweets to view
            newTweets.forEach(function(tweet) {
                console.log("sending tweet #" + tweet.id + "...")
                client.emit('sendTweets', tweet);
            })
            // update lastTweetID
            console.log('setting lastTweetID...' + lastTweetID)
            getLastTweetID(function(err, id) {
                if (err) return console.error(err);
                lastTweetID = id;
            });
        })
    }

})
        // =========================================


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


// module.exports = app;
server.listen(port);

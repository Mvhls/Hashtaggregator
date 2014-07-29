var express = require('express');
var path = require('path');
var port = process.env.PORT || 3888;
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pg = require('pg');
var routes = require('./routes/index');
var messenger = require('./messenger');
// Custom Query Functions
var streamTweetsToClient = require('./tasks/streamTweetsToClient');
var getAllTweetsFromDB = require('./tasks/getAllTweetsFromDB');
var getNewTweets = require('./tasks/getNewTweets');
var getLastTweetID = require('./tasks/getLastTweetID');
// constants and vars
var TWEET_SENDING_DELAY = 5;
var initialTweets;

// run stream
var stream = require('./stream/twitterStreamToDatabase')();


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

    getLastTweetID(function(err, id) {
        if (err) return console.error(err);
        lastTweetID = id;
        console.log('last tweet id set to ' + lastTweetID);
        client.emit('lastTweet', lastTweetID);
    })

    // on 'ready', serve all the tweets from the db
    client.on('ready', function() {
        console.log('client ready...')
        // stream initial tweets to client
        streamTweetsToClient(initialTweets, client, TWEET_SENDING_DELAY);
        // alert client to id of last tweet sent
    })

    // periodically check db for new tweets
    client.on('moarTweets', function(id) {
        console.log('getting moar tweets!');
        getNewTweets(null, lastTweetID, function(err, newTweets) {
            if(err) return console.error(err);
            // send tweets to view
            newTweets.forEach(function(tweet) {
                console.log("sending tweet #" + tweet.id + "...")
                client.emit('sendTweets', tweet);
            })
            // update lastTweetID
            getLastTweetID(function(err, id) {
                if (err) return console.error(err);
                lastTweetID = id;
                client.emit('lastTweet', lastTweetID);
            })
        })
    })

    client.on('newStream', function(hashtag) {
        messenger.emit('destroy');
        if (hashtag[0] === '#') {
            stream = require('./stream/twitterStreamToDatabase')(hashtag);
        } else {
            stream = require('./stream/twitterStreamToDatabase')('#' + hashtag);
        }
    })
})


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

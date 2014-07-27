var express = require('express');
var path = require('path');
var port = process.env.PORT || 3888;
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Database Requires
var pg = require('pg');
var routes = require('./routes/index');
// Custom Query Functions
var getAllTweetsFromDB = require('./tasks/getAllTweetsFromDB');
var getNewTweets = require('./tasks/getNewTweets');
var getLastTweetID = require('./tasks/getLastTweetID');

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

    // on connection, serve all the tweets from the db
    getAllTweetsFromDB(null, function(err, results) {
        if(err) return console.error(err);
        // send tweets to view
        results.forEach(function(tweet) {
            client.emit('sendTweets', tweet);
        })
        // save id of last tweet sent to client on connection
        getLastTweetID(function(err, id) {
            if (err) return console.error(err);
            lastTweetID = id;
        });
    })

    // periodically check db for new tweets
    function sendNewTweets() {
        console.log('about to get new tweets...')
        getNewTweets(null, lastTweetID, function(err, newTweets) {
            if(err) return console.error(err);
            // send tweets to view
            newTweets.forEach(function(tweet) {
                client.emit('sendTweets', tweet);
            })
            // update lastTweetID
            console.log('setting lastTweetID...')
            console.log(lastTweetID)
            getLastTweetID(function(err, id) {
                if (err) return console.error(err);
                lastTweetID = id;
            });
        })
    }

    setInterval(sendNewTweets, 10000);

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

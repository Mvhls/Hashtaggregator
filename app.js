var express = require('express');
var path = require('path');
var port = process.env.PORT || 3888;
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Database Requires
var pg = require('pg');
var routes = require('./routes/index');
var backEndServer = require('events').EventEmitter;

var allTweets = require('./getTweetsFromDB')

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
    console.log(client);
    // on connection, serve all the tweets from the db

    function split(a, n) {
    var len = a.length,out = [], i = 0;
    while (i < len) {
        var size = Math.ceil((len - i) / n--);
        out.push(a.slice(i, i += size));
        }
        return out;
    }
    require('./getTweetsFromDB')(null, function(err, results) {
        if(err) return console.error(err);
        var resultsArray  = split(results,1000)
        resultsArray.forEach(function(tweet) {
            client.emit('sendTweets', tweet);
        })
    })


    // listen for new tweets to be created
    // backEndServer.on('newTweet', function(tweet) {

    //     // send those tweets to client
    //     io.sockets.broadcast.emit('tweetToClient', tweet)
    // })
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

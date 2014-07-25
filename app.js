var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var orm = require('orm');
var pg = require('pg');
var db = orm.connect(process.env.DATABASE_URL || "postgres://apprentice@localhost/source_development")

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var Tweet;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/users', users);

/// setup ORM

db.on("connect", function (err) {
    console.log('trying to connect to database...')
    if(err) {
        console.log("something is wrong with the database connection", err);
        return;
    }
    Tweet = db.define('tweets', {
        username    : { type: "text" },
        content     : { type: "text" },
        longitude   : { type: "number" },
        latitude    : { type: "number" },
        twitter_id  : { type: "text" },
        location    : { type: "text" },
        stars       : { type: "integer" }
    });

    Tweet.find({
        username: "zachpflederer"
    }, function(err, tweets) {
        if(err) {
            console.log(err)
        }
        else {
            console.log('hi')
            console.log(tweets[0].content);
        }
    })
})

app.set('createTweet', function(newTweet){
    Tweet.create(newTweet, function(err, results) {
        if(err) {
            console.log(err)
        }
        else {
            console.log('tweet created');
            console.log(results);
        }
    });
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


module.exports = app;

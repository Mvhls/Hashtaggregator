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
    var Tweet = db.define('tweet', {
        id          : { type: "integer" },
        username    : { type: "text" },
        content     : { type: "text" },
        longitude   : { type: "number" },
        latitude    : { type: "number" },
        twitter_id  : { type: "text" },
        location    : { type: "text" },
        stars       : { type: "integer" },
        created_at  : { type: "date" },
        updated_at  : { type: "date" }
    });

    var tweet = Tweet.find({
        username: "zachpflederer"
    }, function(err, tweets) {
        console.log('hi')
        console.log(tweet.content);
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


module.exports = app;

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Database Requires
var orm = require('orm');
var pg = require('pg');
var db = orm.connect(process.env.DATABASE_URL
  || "postgres://apprentice@localhost/source_development");
// var TweetSchema = require('.models/TweetSchema')
var routes = require('./routes/index');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

// database connection

db.on("connect", function(err) {
  console.log('trying to connect to database...')

  if(err) {
      console.log("something is wrong with the database connection", err);
      return;
  }

  db.load("./models/TweetSchema", function(err) {
    if (err) {
      console.log('TweetSchema not loaded correctly', err);
      return;
    }
    console.log(db.models.tweets);
  })

  db.models.tweets.find({
    username: "zachpflederer"
  }, function(err, tweets) {
    if(err) {
      console.log(err)
    }
    else {
      console.log(tweets);
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


module.exports = app;

var sql = require('sql');
var tweetTable = require('./schema')

var tweets = sql.define({
  name: tweetTable.name,
  columns: tweetTable.columns
});

// tweets.create();
console.log(tweets.create().toQuery().text);

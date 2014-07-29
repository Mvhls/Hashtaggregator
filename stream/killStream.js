var twitterStream = require('./twitterStream');
var stream = twitterStream();

module.exports = function(){
  console.log("im in the destroy")
  stream.destroy()
}

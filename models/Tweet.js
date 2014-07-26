function Tweet(twitterTweet){
  this.username = twitterTweet.
  this.content = twitterTweet.text,
  this.latitude = twitterTweet.coordinates[0],
  this.longitude = twitterTweet.coordinates[1],
  this.twitter_id = twitterTweet.id_str,
  this.location = twitterTweet.user.location,
  this.stars = twitterTweet.favorite_count
}

module.exports = Tweet;

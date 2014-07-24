function Tweet(args){
  this.id = args.id,
  this.username = args.username,
  this.content = args.content,
  this.longitude = args.longitude,
  this.latitude = args.latitude,
  this.twitter_id = args.twitter_id,
  this.location = args.location,
  this.stars = args.stars,
  this.created_at = new Date().toString(),
  this.updated_at = new Date().toString()
}

module.exports.Tweet = {

}

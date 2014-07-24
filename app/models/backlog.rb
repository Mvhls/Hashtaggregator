class Backlog
  include Sidekiq::Worker

  def perform(tweet)
    create_tweet(tweet)
  end

  def create_tweet(tweet)
    Tweet.create({
      username: tweet.user.screen_name,
      content: tweet.full_text,
      latitude: tweet.geo.coordinates[0],
      longitude: tweet.geo.coordinates[1],
      url: tweet.place.url,
      twitter_id: tweet.id,
      location: tweet.place.full_name
    })
  end
end

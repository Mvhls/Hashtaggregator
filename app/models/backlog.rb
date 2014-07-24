class Backlog
include Sidekiq::Worker

  def perform(hashtag)
    create_tweet(hashtag)
  end

  def create_tweet(tweet)
    tweet = Tweet.create({
      username: tweet.user.screen_name,
      content: tweet.full_text,
      latitude: tweet.geo.coordinates[0],
      longitude: tweet.geo.coordinates[1],
      url: tweet.place.url,
      twitter_id: tweet.id,
      location: tweet.full_name
    })
  end
end
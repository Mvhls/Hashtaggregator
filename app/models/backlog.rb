class Backlog
  include Sidekiq::Worker

  def perform(tweet)
    create_tweet(tweet)
  end

  def create_tweet(tweet)
    Tweet.create(tweet)
  end
end

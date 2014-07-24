class TweetsController < ApplicationController
  include TwitterCredentialHelper

  def stream
    set_up_client
    @client.filter(:track => "#myworstbirthday") do |twitter_tweet|
      next if twitter_tweet.text.include? 'RT'
      new_tweet = {
        username: twitter_tweet.user.screen_name,
        content: twitter_tweet.full_text,
        latitude: twitter_tweet.geo.coordinates[0],
        longitude: twitter_tweet.geo.coordinates[1],
        url: twitter_tweet.place.url,
        twitter_id: twitter_tweet.id,
        location: twitter_tweet.place.full_name
      }
      Backlog.perform_async(new_tweet)
      # p twitter_tweet.text if twitter_tweet.is_a?(Twitter::Tweet)
      # hey mike/jonathon, this seems a little janky to us but it works.
      # @tweet = twitter_tweet
      # return (@tweet) if ENV[:test]
    end
  end
end

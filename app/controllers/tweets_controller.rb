class TweetsController < ApplicationController
  include TwitterCredentialHelper

  def stream
    set_up_client
    @client.filter(:track => "#myworstbirthday") do |object|
      next if object.text.include? 'RT'

      # p object.text if object.is_a?(Twitter::Tweet)
      # hey mike/jonathon, this seems a little janky to us but it works.
      @tweet = object
      return (@tweet) if ENV[:test]
    end
  end
end

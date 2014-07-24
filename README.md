#hashtaggregate

###crowdsource the funniest tweets for the Tonight Show's Wednesday hashtag game

##Tech:

- Twitter Streaming API
  - POST/status (with filters)
- Rails Backend
  - ActiveRecord is great
  - Can feed a stream of data to just one client (Node Server)
- Node/Express App
  - Feed data to client in real-time
  - Take user input(upvotes)
  - Modify JS Tweet objects based on User upvotes
  - Modify User rankings based on User upvotes
- Angular frontend
  - 1 view(don't want to waste a lot of time designing and styling a bunch of sublls
  views)
  - Modify Tweets display in the front-end
    - searchable map(find Tweets by content, User ranking, or pre-defined tags)

##to run locally

- fire up redis
<tt>redis-server</tt>

- fire up sidekiq:
<tt>bundle exec sidekiq -r./config/environment.rb</tt>

##for deployment
- [https://github.com/mperham/sidekiq/wiki/Deployment](sidekiq and heroku docs)

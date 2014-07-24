#hashtaggregate

An app that crowdsources the process of choosing the funniest tweets to be read on the Hashtag segment of the Tonight Show, on Thursday nights.

##product objectives
- capture a stream of tweets with the Tonight Show's hashtag of the week
- save tweets with ActiveRecord
- build a Rails API that provides all the tweets for a certain hashtag that is provided by the user (through the Node app)
- stream those tweets through Node, in real time, to the client
- display tweets on a map
- use Angular-powered search to interract with the map and see a subset of tweets, sorted by content, user, popularity, or custom tag
- read, retweet, and favorite tweets through the map interface

##learning objectives:
- Learn how to test difficult processes, like a Twitter Stream
- Use Twitter Streaming API to collect all the tweets with a certain hashtag. Be prepared to handle big spikes in incoming data.
- Use Node.js to send a live stream of data to our view.
- Use Angular.js to create dynamic, instant search in our front end.

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
  - 1 view(don't want to waste a lot of time designing and styling a bunch of  views)
  - Modify Tweets display in the front-end
    - searchable map(find Tweets by content, User ranking, or pre-defined tags)

##to run locally

- fire up redis
<tt>redis-server</tt>

- fire up sidekiq:
<tt>bundle exec sidekiq -r./config/environment.rb</tt>

##for deployment
- [https://github.com/mperham/sidekiq/wiki/Deployment](sidekiq and heroku docs)

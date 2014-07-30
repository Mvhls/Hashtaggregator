#hashtaggregate
==============

An app that streams tweets from a selected hashtag and geographically displays them.

##product objectives
- capture a stream of tweets from twitter
- save tweets
- display tweets on a map
- use Angular-powered search to find spefic tweets and zoom in on location

##learning objectives:
- Learn how to test difficult processes, like a Twitter Stream
- Use Twitter Streaming API to collect all the tweets by hashtag. Be prepared to handle big spikes in incoming data.
- Feed tweets to client with Node.js, compare this experience to our other app in Rails
- Use Angular.js to create dynamic, instant search in our front end.

##Tech:

- Twitter Streaming API
  - POST/status (with filters)
- Node.js Backend
  - recieve tweets from twitter stream and store in database
  - Send socketed clients with tweets existing in database
  - Update client realtime with newly recieved tweets
- Angular frontend
  - 1 view(don't want to waste a lot of time designing and styling a bunch of  views)
  - Modify Tweets display in the front-end
    - searchable map(find Tweets by content, User ranking, or pre-defined tags)



##to run locally with twitter api keys

- run npm install to require dependencies
- export twitter keys into the terminal with variable name the in keys file
- change local host name in tasks/query.js line 4
- run node app.js
- app is configured to run on port: 3888




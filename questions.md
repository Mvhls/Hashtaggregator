#How do we test our Twitter Stream?
- do we need to test the stream itself? or is that unneccessary if what we really want is to test that the route 'tweets#stream' just adds new Tweets to the database?
- We tried adding a line in our controller code that kills the streaming process after one tweet is caught, only if the environment is test. However, that seems a little janky to us. Check out tweets_controller.rb:9 for the low-down

#what is hashtaggregate?

##quick demo

##what does it do?
- it streams tweets with a hashtag of our choice
- saves the ones with geotags
- shows them on a searchable map

##what problems did we need to solve?
- handling lots of streaming data
- rapid-fire communication between client and server
- updating view with live stream

=====
#we built it in rails

##rails was the comfortable choice
- setting up the stream was easy

- but we needed multiple processes
	- the stream worked, but it blocked everything else
	- separating the stream from the web process helped, but we still needed a background job

- not a lot of flexibility (i.e. we couldn't change the stream on the fly)
- laggy view, because of sending big chunks of data in each http request


=====
#we built it in node

##node was the right choice
- huge learning curve
	- understanding callbacks
	- embracing modular design
	- testing without a framework like rspec

- the more we began to understand Node, the more we realized we could do
- it's doing more things than the rails app, faster, on a single process
- instead of separate http requests, we used websockets to communicate between the server and client
- we missed the conventions and maturity of rails
	- ###rails has
	- more consistent documentation
	- better errors
	- a more well-traveled path for us to follow
	- ###node has
	- some amazing abilities
	- but it's kind of the wild west out there when it comes to modules and documentation

=====
#we search it with angular

##node gave us a cool-looking map, but angular made it interactive
- we wanted a single-view experience
	- updated in real-time
	- searchable without database queries or page reloads

- we just scratched the surface of angular.js
	- simple search through javascript objects
	- allows user to search for any content or twitter handle
		- instant, flexible results
		- no http request, no databse calls
		- connected to the map



=========

notes:

tech slide
slides in general

get the storyline right
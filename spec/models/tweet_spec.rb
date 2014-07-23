require 'rails_helper'

describe 'tweet model' do 
	
	let(:tweet) {Tweet.new(
		username: 'this_guy',
		content: 'this guy is tweeting', 
		stars: 2, 
		latitude: 500, 
		longitude: 300,
		url: "http://this_guy.com",
		twitter_id: 17,
		city: "Chicago",
		state: "Illinois")}

	it 'should create a tweet' do
		expect(tweet).to be_a_kind_of(tweet)
	end

end

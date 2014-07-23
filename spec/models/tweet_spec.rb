require 'rails_helper'

describe Tweet do

before(:each) do
	@tweet = Tweet.create(
		username: 'this_guy',
		content: 'this guy is tweeting', 
		stars: 2, 
		latitude: 500, 
		longitude: 300,
		url: "http://this_guy.com",
		twitter_id: 17,
		city: "Chicago",
		state: "Illinois")
end

	it 'should create a tweet' do
		expect(@tweet).to be_a_kind_of(Tweet)
	end

	it 'validates tweet id is unique' do 		
		expect{Tweet.create(username: 'mee', twitter_id: 17)}.to_not change{Tweet.all.count}
	end 



end

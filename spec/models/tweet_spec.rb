require 'rails_helper'

describe Tweet do

	let(:tweet) { create :tweet }
	let(:tweet_hash) { attributes_for :tweet }
# before(:each) do
# 	@tweet = Tweet.create(
# 		username: 'this_guy',
# 		content: 'this guy is tweeting',
# 		stars: 2,
# 		latitude: 500,
# 		longitude: 300,
# 		url: "http://this_guy.com",
# 		twitter_id: 17,
# 		location: "Chicago, IL")
# end

	it 'should create a tweet' do
		expect(tweet).to be_a_kind_of(Tweet)
	end

	it 'validates tweet id is unique' do
		Tweet.create tweet_hash
		expect{Tweet.create(tweet_hash)}.to_not change{Tweet.all.count}
	end



end

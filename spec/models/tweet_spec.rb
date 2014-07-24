require 'rails_helper'

describe Tweet do

	# let(:tweet) { create :tweet }
	let(:tweet_hash) { attributes_for :tweet }

	subject{ create :tweet }

	it { should respond_to :username }
	it { should respond_to :content }
	it { should respond_to :stars }
	it { should respond_to :latitude }
	it { should respond_to :longitude }
	it { should respond_to :url }
	it { should respond_to :location }
	it { should_not respond_to :turd_ferguson }

	it 'validates tweet id is unique' do
		Tweet.create tweet_hash
		expect{Tweet.create(tweet_hash)}.to_not change{Tweet.all.count}
	end



end

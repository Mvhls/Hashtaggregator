# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  user = "twitter_user"
  id = 1
  factory :tweet do
    username user
    content "tweet tweet said the bobolink"
    stars 1
    latitude 1
    longitude 1
    url "https://twitter.com/#{user}/status/#{id}"
    twitter_id id
    location "Pawnee, IN"
  end
end

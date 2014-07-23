# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :tweet do
    username "MyString"
    content "MyString"
    stars 1
    latitutde 1
    longitude 1
    url "MyString"
    twitter_id 1
    city "MyString"
    state "MyString"
  end
end

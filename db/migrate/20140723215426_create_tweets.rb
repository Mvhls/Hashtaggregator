class CreateTweets < ActiveRecord::Migration
  def change
    create_table :tweets do |t|
      t.string  :username
      t.string  :content
      t.integer :stars
      t.integer :latitude
      t.integer :longitude
      t.string  :url
      t.string  :twitter_id
      t.string  :location

      t.timestamps
    end
  end
end

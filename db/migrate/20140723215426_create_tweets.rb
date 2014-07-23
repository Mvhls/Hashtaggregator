class CreateTweets < ActiveRecord::Migration
  def change
    create_table :tweets do |t|
      t.string :username
      t.string :content
      t.integer :stars
      t.integer :latitutde
      t.integer :longitude
      t.string :url
      t.integer :twitter_id
      t.string :city
      t.string :state

      t.timestamps
    end
  end
end

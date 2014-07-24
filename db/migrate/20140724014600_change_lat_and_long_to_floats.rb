class ChangeLatAndLongToFloats < ActiveRecord::Migration
  def change
    change_column :tweets, :latitude, :float
    change_column :tweets, :longitude, :float
  end
end

class AddIsoppositionToClubs < ActiveRecord::Migration
  def change
    add_column :clubs, :isOpposition, :Boolean, :default => false 
  end
end

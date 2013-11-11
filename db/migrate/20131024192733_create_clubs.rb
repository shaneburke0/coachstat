class CreateClubs < ActiveRecord::Migration
  def change
    create_table :clubs do |t|
      t.string :name
      t.integer :type
      t.string :location
      t.integer :profileid

      t.timestamps
    end
  end
end

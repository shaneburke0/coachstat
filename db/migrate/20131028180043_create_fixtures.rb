class CreateFixtures < ActiveRecord::Migration
  def change
    create_table :fixtures do |t|
      t.string :location
      t.datetime :date
      t.time :time
      t.integer :clubid
      t.integer :oppid
      t.integer :home

      t.timestamps
    end
  end
end

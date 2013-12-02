class CreateFixturestats < ActiveRecord::Migration
  def change
    create_table :fixturestats do |t|
      t.integer :mins
      t.integer :goals
      t.integer :assists
      t.integer :shotstarget
      t.integer :shotswide
      t.integer :passsuccess
      t.integer :passmissed
      t.integer :tackleswon
      t.integer :tackleslost
      t.integer :og
      t.integer :yc
      t.integer :rc
      t.integer :fixtureid
      t.integer :playerid

      t.timestamps
    end
  end
end

class CreateGamestats < ActiveRecord::Migration
  def change
    create_table :gamestats do |t|
      t.integer :goals
      t.integer :shotstarget
      t.integer :shotswide
      t.integer :possession
      t.integer :tackleswon
      t.integer :tackleslost
      t.integer :offsides
      t.integer :corners
      t.integer :passsuccess
      t.integer :passmissed
      t.integer :crosssuccess
      t.integer :crossmissed
      t.integer :clearances
      t.integer :fouls
      t.integer :yc
      t.integer :rc

      t.timestamps
    end
  end
end

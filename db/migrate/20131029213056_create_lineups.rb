class CreateLineups < ActiveRecord::Migration
  def change
    create_table :lineups do |t|
      t.integer :id
      t.integer :fixtureid
      t.integer :clubid
      t.integer :formationid

      t.timestamps
    end
  end
end

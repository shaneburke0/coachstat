class CreateLineupplayers < ActiveRecord::Migration
  def change
    create_table :lineupplayers do |t|
      t.integer :id
      t.integer :lineupid
      t.integer :playerid
      t.boolean :captain, :default => false
      t.string :subon
      t.string :suboff

      t.timestamps
    end
  end
end

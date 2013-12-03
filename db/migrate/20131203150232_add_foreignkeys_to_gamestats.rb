class AddForeignkeysToGamestats < ActiveRecord::Migration
  def change
    add_column :gamestats, :fixtureid, :integer
    add_column :gamestats, :clubid, :integer
  end
end

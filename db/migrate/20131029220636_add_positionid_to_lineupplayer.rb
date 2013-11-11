class AddPositionidToLineupplayer < ActiveRecord::Migration
  def change
    add_column :lineupplayers, :positionid, :integer
  end
end

class RemoveSubOnSubOffFromLineupplayer < ActiveRecord::Migration
  def change
    remove_column :lineupplayers, :suboff, :string
    remove_column :lineupplayers, :subon, :string
    add_column :lineupplayers, :position, :string
  end
end

class AddClubnameToPlayers < ActiveRecord::Migration
  def change
    add_column :players, :clubname, :string
  end
end

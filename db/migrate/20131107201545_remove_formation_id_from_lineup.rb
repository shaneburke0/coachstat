class RemoveFormationIdFromLineup < ActiveRecord::Migration
  def up
    remove_column :lineups, :formationid
  end

  def down
    add_column :lineups, :formationid, :string
  end
end

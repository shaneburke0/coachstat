class RenameTypeFromClubs < ActiveRecord::Migration
  def up
    rename_column :clubs, :type, :club_type
  end

  def down
  end
end

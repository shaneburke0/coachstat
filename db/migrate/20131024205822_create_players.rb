class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :firstName
      t.string :lastName
      t.string :position
      t.date :dob
      t.decimal :height
      t.decimal :weight
      t.integer :clubid

      t.timestamps
    end
  end
end

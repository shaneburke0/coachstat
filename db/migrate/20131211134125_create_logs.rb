class CreateLogs < ActiveRecord::Migration
  def change
    create_table :logs do |t|
      t.string :message
      t.datetime :date
      t.string :method

      t.timestamps
    end
  end
end

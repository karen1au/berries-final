class CreateNotifications < ActiveRecord::Migration[5.2]
  def change
    create_table :notifications do |t|
      t.string :type
      t.integer :sender_id
      t.integer :receiver_id
      t.timestamps
    end
    add_foreign_key :notifications, :users, column: :sender_id
    add_foreign_key :notifications, :users, column: :receiver_id
  end
end

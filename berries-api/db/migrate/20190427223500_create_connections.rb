class CreateConnections < ActiveRecord::Migration[5.2]
  def change
    create_table :connections do |t|
      t.integer :user1_id
      t.integer :user2_id

      t.timestamps

    end

    add_foreign_key :connections, :users, column: :user1_id
    add_foreign_key :connections, :users, column: :user2_id
  end
end

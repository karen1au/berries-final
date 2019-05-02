class AddCreatorToChat < ActiveRecord::Migration[5.2]
  def change
    add_column :chats, :creator_id, :integer
    add_foreign_key :chats, :users, column: :creator_id
  end
end

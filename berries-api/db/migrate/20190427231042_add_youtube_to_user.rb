class AddYoutubeToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :youtube, :string
  end
end

class AddSoundcloudToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :soundcloud, :string
  end
end

class AddLatsToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :lat, :numeric
    add_column :users, :lng, :numeric
  end
end

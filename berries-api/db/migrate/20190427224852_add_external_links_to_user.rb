class AddExternalLinksToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :external_links, :text, array: true, default: []
  end
end

class RemoveExternalLinksFromUser < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :external_links, :text
  end
end

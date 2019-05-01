class ChangeConnectionsToRelationships < ActiveRecord::Migration[5.2]
  def change
    rename_table :connections, :relationships
  end
end

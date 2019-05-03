class ChangeTypeColumnName < ActiveRecord::Migration[5.2]
  def change
    rename_column :notifications, :type, :noti_type
  end
end

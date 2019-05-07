class ChangeDefaultAvatar < ActiveRecord::Migration[5.2]
  def change
    change_column_default :users, :avatar, "https://www.shareicon.net/data/2016/05/05/760038_food_512x512.png"
  end
end

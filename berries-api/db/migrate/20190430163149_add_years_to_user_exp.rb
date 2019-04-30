class AddYearsToUserExp < ActiveRecord::Migration[5.2]
  def change
    add_column :user_exps, :years, :string
  end
end

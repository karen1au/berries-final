class RemoveYearsFromUserExp < ActiveRecord::Migration[5.2]
  def change
    remove_column :user_exps, :years, :integer
  end
end

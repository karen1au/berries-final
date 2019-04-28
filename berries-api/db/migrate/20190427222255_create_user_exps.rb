class CreateUserExps < ActiveRecord::Migration[5.2]
  def change
    create_table :user_exps do |t|
      t.references :user, foreign_key: true
      t.references :instrument, foreign_key: true
      t.integer :years

      t.timestamps
    end
  end
end

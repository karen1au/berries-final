class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.string :avatar
      t.boolean :band
      t.string :location
      t.string :commitment
      t.string :external_links

      t.timestamps
    end
  end
end

class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.references :user, index: true, foreign_key: true, null: false
      t.references :film, index: true, foreign_key: true, null: false
      t.integer :value, null: false

      t.timestamps null: false
    end
  end
end

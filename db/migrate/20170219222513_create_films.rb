class CreateFilms < ActiveRecord::Migration
  def change
    create_table :films do |t|
      t.string :title, null: false
      t.text :description
      t.string :url_slug, null: false, unique: true
      t.integer :year, null: false

      t.timestamps null: false
    end
  end
end

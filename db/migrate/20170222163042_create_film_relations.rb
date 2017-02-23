class CreateFilmRelations < ActiveRecord::Migration
  def change
    create_table :film_relations do |t|
      t.integer :film1, references: :films, index: true, foreign_key: true, null: false
      t.integer :film2, references: :films, index: true, foreign_key: true, null: false

      t.timestamps null: false
    end
  end
end

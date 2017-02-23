class RenameFilm1ToFilm1IdAndFilm2ToFilm2Id < ActiveRecord::Migration
  def change
    rename_column :film_relations, :film1, :film1_id
    rename_column :film_relations, :film2, :film2_id
  end
end

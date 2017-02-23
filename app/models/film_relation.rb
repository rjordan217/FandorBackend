class FilmRelation < ActiveRecord::Base
  validates :film1_id, uniqueness: {scope: :film2_id}
  validates :film1, presence: true
  validates :film2, presence: true

  belongs_to :film1, class_name: "Film", foreign_key: "film1_id"
  belongs_to :film2, class_name: "Film", foreign_key: "film2_id"
end

class Film < ActiveRecord::Base
  validates :title, presence: true
  validates :url_slug, presence: true, uniqueness: true, format: {
    with: /\A[a-z0-9\-_]+\z/,
    message: "Letters, numbers, and underscore ('_') only allowed characters"
  }
  validates :year, presence: true

  has_many :film_relations,
    foreign_key: :film1_id,
    class_name: "FilmRelation",
    dependent: :destroy

  has_many :ratings, dependent: :destroy

  def self.parse_title_to_slug(title)
    ActiveSupport::Inflector.parameterize(title, '_')
  end

  def self.add_relation(ids)
    FilmRelation.transaction do
      FilmRelation.create!(film1_id: ids[0], film2_id: ids[1])
      FilmRelation.create!(film1_id: ids[1], film2_id: ids[0])
    end
  end

  def related_film_ids
    unsortedIds = film_relations.map {|relation| relation.film2_id}
    unsortedIds.sort
  end

  def average_rating
    self.ratings.average(:value) || 0
  end
end

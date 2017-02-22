class Film < ActiveRecord::Base
  validates :title, presence: true
  validates :url_slug, presence: true, uniqueness: true, format: {
    with: /\A[a-zA-Z_\d]+\z/,
    message: "Letters, numbers, and underscore ('_') only allowed characters"
  }
  validates :year, presence: true
end

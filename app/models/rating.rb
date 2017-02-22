class Rating < ActiveRecord::Base
  validates :film_id, uniqueness: {scope: :user_id}
  
  belongs_to :user
  validates :user, presence: true

  belongs_to :film
  validates :film, presence: true
end

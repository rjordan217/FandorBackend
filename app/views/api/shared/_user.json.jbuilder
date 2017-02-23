json.extract! user, :username, :id
json.errors errors
json.rated_films do
  json.array! user.rated_films, partial: '/api/shared/film', as: :film
end

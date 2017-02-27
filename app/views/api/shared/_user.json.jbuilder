json.extract! user, :username
json.errors errors
json.rated_films do
  json.array! user.rated_films, partial: '/api/shared/film', as: :film
end

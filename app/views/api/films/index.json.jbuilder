json.films do
  json.array! @films, partial: '/api/shared/film', as: :film
end
json.errors @errors

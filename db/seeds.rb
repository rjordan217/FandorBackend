# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'faker'

User.create!(username: 'adminLovesPizza', password: 'L337F0rLyf3')

prng = Random.new
10.times do
  attrs = {
    title: Faker::LordOfTheRings.unique.location,
    description: Faker::StarWars.quote,
    year: prng.rand(1950..2017)
  }
  attrs[:url_slug] = Film.parse_title_to_slug(attrs[:title])
  Film.create!(attrs)
end

10.times do
  film1_id = prng.rand(1..10)
  film2_id = prng.rand(1..10)
  film2_id = prng.rand(1..10) until film1_id != film2_id
  Film.add_relation([film1_id, film2_id])
end

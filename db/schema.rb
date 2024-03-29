# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170222181851) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "film_relations", force: :cascade do |t|
    t.integer  "film1_id",   null: false
    t.integer  "film2_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "film_relations", ["film1_id"], name: "index_film_relations_on_film1_id", using: :btree
  add_index "film_relations", ["film2_id"], name: "index_film_relations_on_film2_id", using: :btree

  create_table "films", force: :cascade do |t|
    t.string   "title",       null: false
    t.text     "description"
    t.string   "url_slug",    null: false
    t.integer  "year",        null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "ratings", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "film_id",    null: false
    t.integer  "value",      null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "ratings", ["film_id"], name: "index_ratings_on_film_id", using: :btree
  add_index "ratings", ["user_id"], name: "index_ratings_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_foreign_key "ratings", "films"
  add_foreign_key "ratings", "users"
end

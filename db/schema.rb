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

ActiveRecord::Schema.define(version: 20140723215426) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "proficiencies", force: true do |t|
    t.integer  "user_id"
    t.integer  "skill_id"
    t.integer  "years",      default: 0
    t.string   "formal",     default: "no"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "skills", force: true do |t|
    t.string   "name"
    t.string   "context"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tweets", force: true do |t|
    t.string   "username"
    t.string   "content"
    t.integer  "stars"
    t.integer  "latitutde"
    t.integer  "longitude"
    t.string   "url"
    t.integer  "twitter_id"
    t.string   "city"
    t.string   "state"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password_hash"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

end

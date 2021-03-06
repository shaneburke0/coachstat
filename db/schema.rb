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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20131214144908) do

  create_table "clubs", :force => true do |t|
    t.string   "name"
    t.integer  "club_type"
    t.string   "location"
    t.integer  "profileid"
    t.datetime "created_at",                      :null => false
    t.datetime "updated_at",                      :null => false
    t.string   "image"
    t.boolean  "isOpposition", :default => false
  end

  create_table "contactus", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "message"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "fixtures", :force => true do |t|
    t.string   "location"
    t.datetime "date"
    t.time     "time"
    t.integer  "clubid"
    t.integer  "oppid"
    t.integer  "home"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "fixturestats", :force => true do |t|
    t.integer  "mins"
    t.integer  "goals"
    t.integer  "assists"
    t.integer  "shotstarget"
    t.integer  "shotswide"
    t.integer  "passsuccess"
    t.integer  "passmissed"
    t.integer  "tackleswon"
    t.integer  "tackleslost"
    t.integer  "og"
    t.integer  "yc"
    t.integer  "rc"
    t.integer  "fixtureid"
    t.integer  "playerid"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "gamestats", :force => true do |t|
    t.integer  "goals"
    t.integer  "shotstarget"
    t.integer  "shotswide"
    t.integer  "possession"
    t.integer  "tackleswon"
    t.integer  "tackleslost"
    t.integer  "offsides"
    t.integer  "corners"
    t.integer  "passsuccess"
    t.integer  "passmissed"
    t.integer  "crosssuccess"
    t.integer  "crossmissed"
    t.integer  "clearances"
    t.integer  "fouls"
    t.integer  "yc"
    t.integer  "rc"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
    t.integer  "fixtureid"
    t.integer  "clubid"
  end

  create_table "lineupplayers", :force => true do |t|
    t.integer  "lineupid"
    t.integer  "playerid"
    t.boolean  "captain",    :default => false
    t.datetime "created_at",                    :null => false
    t.datetime "updated_at",                    :null => false
    t.integer  "positionid"
    t.string   "position"
  end

  create_table "lineups", :force => true do |t|
    t.integer  "fixtureid"
    t.integer  "clubid"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "logs", :force => true do |t|
    t.string   "message"
    t.datetime "date"
    t.string   "method"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "players", :force => true do |t|
    t.string   "firstName"
    t.string   "lastName"
    t.string   "position"
    t.date     "dob"
    t.decimal  "height"
    t.decimal  "weight"
    t.integer  "clubid"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "image"
    t.string   "clubname"
  end

  create_table "profiles", :force => true do |t|
    t.string   "firstname"
    t.string   "lastname"
    t.string   "address"
    t.string   "mobile"
    t.integer  "user_id"
    t.datetime "created_at",          :null => false
    t.datetime "updated_at",          :null => false
    t.string   "image"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  add_index "profiles", ["user_id"], :name => "index_profiles_on_user_id"

  create_table "users", :force => true do |t|
    t.string   "email",                  :default => "",    :null => false
    t.string   "encrypted_password",     :default => "",    :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                                :null => false
    t.datetime "updated_at",                                :null => false
    t.boolean  "admin",                  :default => false
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end

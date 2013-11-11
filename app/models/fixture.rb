class Fixture < ActiveRecord::Base
  has_many :lineups
  attr_accessible :clubid, :date, :home, :location, :oppid, :time
end

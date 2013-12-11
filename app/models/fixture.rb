class Fixture < ActiveRecord::Base
  has_many :lineups
  
  validates :clubid, :presence => true
  validates :date, :presence => true
  validates :oppid, :presence => true
  
  attr_accessible :clubid, :date, :home, :location, :oppid, :time
end

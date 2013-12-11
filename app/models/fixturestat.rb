class Fixturestat < ActiveRecord::Base
  validates :assists, :presence => true
  validates :fixtureid, :presence => true
  validates :goals, :presence => true
  validates :mins, :presence => true
  validates :og, :presence => true
  validates :passmissed, :presence => true
  validates :passsuccess, :presence => true
  validates :playerid, :presence => true
  validates :rc, :presence => true
  validates :shotstarget, :presence => true
  validates :tackleslost, :presence => true
  validates :shotswide, :presence => true
  validates :tackleswon, :presence => true
  validates :yc, :presence => true
  
  attr_accessible :assists, :fixtureid, :goals, :mins, :og, :passmissed, :passsuccess, :playerid, :rc, :shotstarget, :shotswide, :tackleslost, :tackleswon, :yc
end

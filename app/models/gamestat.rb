class Gamestat < ActiveRecord::Base
  validates :clearances, :presence => true
  validates :corners, :presence => true
  validates :crossmissed, :presence => true
  validates :crosssuccess, :presence => true
  validates :fouls, :presence => true
  validates :goals, :presence => true
  validates :offsides, :presence => true
  validates :passmissed, :presence => true
  validates :passsuccess, :presence => true
  validates :possession, :presence => true
  validates :rc, :presence => true
  validates :shotstarget, :presence => true
  validates :shotswide, :presence => true
  validates :tackleslost, :presence => true
  validates :tackleswon, :presence => true
  validates :yc, :presence => true
  validates :fixtureid, :presence => true
  validates :clubid, :presence => true
  
  attr_accessible :clearances, :corners, :crossmissed, :crosssuccess, :fouls, :goals, :offsides, :passmissed, :passsuccess, :possession, :rc, :shotstarget, :shotswide, :tackleslost, :tackleswon, :yc ,:fixtureid, :clubid
end

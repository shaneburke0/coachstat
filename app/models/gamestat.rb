class Gamestat < ActiveRecord::Base
  attr_accessible :clearances, :corners, :crossmissed, :crosssuccess, :fouls, :goals, :offsides, :passmissed, :passsuccess, :possession, :rc, :shotstarget, :shotswide, :tackleslost, :tackleswon, :yc ,:fixtureid, :clubid
end

class Fixturestat < ActiveRecord::Base
  attr_accessible :assists, :fixtureid, :goals, :mins, :og, :passmissed, :passsuccess, :playerid, :rc, :shotstarget, :shotswide, :tackleslost, :tackleswon, :yc
end

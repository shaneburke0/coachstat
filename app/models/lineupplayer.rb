class Lineupplayer < ActiveRecord::Base
  belongs_to :lineup
  attr_accessible :captain, :id, :lineupid, :playerid, :position, :positionid
end

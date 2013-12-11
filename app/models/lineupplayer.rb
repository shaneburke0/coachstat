class Lineupplayer < ActiveRecord::Base
  validates :playerid, :presence => true
  validates :lineupid, :presence => true
  validates :id, :presence => true
  
  belongs_to :lineup
  attr_accessible :captain, :id, :lineupid, :playerid, :position, :positionid
end

class Lineup < ActiveRecord::Base
  belongs_to :fixture
  has_many :lineupplayers
  attr_accessible :clubid, :fixtureid, :id
end

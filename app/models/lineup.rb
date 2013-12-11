class Lineup < ActiveRecord::Base
  validates :clubid, :presence => true
  validates :fixtureid, :presence => true
  validates :id, :presence => true
  
  belongs_to :fixture
  has_many :lineupplayers
  attr_accessible :clubid, :fixtureid, :id
end

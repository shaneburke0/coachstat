class Player < ActiveRecord::Base
  validates :clubid, :presence => true
  validates :lastName, :presence => true
  
  belongs_to :club
  attr_accessible :clubid, :dob, :firstName, :height, :lastName, :position, :weight, :image, :clubname
end

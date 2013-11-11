class Player < ActiveRecord::Base
  belongs_to :club
  attr_accessible :clubid, :dob, :firstName, :height, :lastName, :position, :weight, :image, :clubname
end

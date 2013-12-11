class Club < ActiveRecord::Base
  validates :name, :presence => true
  validates :profileid, :presence => true
  validates :club_type, :presence => true
  
  belongs_to :profile
  has_many :players
  has_many :fixtures
  attr_accessible :location, :name, :profileid, :club_type, :image, :isOpposition
  
end

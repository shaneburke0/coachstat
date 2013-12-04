class Club < ActiveRecord::Base
  belongs_to :profile
  has_many :players
  has_many :fixtures
  attr_accessible :location, :name, :profileid, :club_type, :image, :isOpposition
end

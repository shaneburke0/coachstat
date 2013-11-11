class Profile < ActiveRecord::Base
  belongs_to :user
  has_many :clubs
  attr_accessible :address, :firstname, :lastname, :mobile, :user_id
end

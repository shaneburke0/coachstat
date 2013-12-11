class Contactu < ActiveRecord::Base
  validates :name, :presence => true
  validates :email, :presence => true
  validates :message, :presence => true
  
  attr_accessible :email, :message, :name
end

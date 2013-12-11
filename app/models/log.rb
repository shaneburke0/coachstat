class Log < ActiveRecord::Base
  validates :message, :presence => true

  attr_accessible :date, :message, :method
end

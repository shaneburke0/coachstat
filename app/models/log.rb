class Log < ActiveRecord::Base
  attr_accessible :date, :message, :method
end

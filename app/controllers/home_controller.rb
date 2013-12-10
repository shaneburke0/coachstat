class HomeController < ApplicationController
  require 'ReadLogs'
  def index
    if current_user.try(:admin?)
      redirect_to "/admin"
    end
    # uncomment to show logs
    #readlogs = ::ReadLogs.new
    #@readlogs_div_tag = readlogs.read('development.log')
  end
end

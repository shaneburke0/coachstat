class HomeController < ApplicationController
  require 'ReadLogs'
  def index
    # uncomment to show logs
    #readlogs = ::ReadLogs.new
    #@readlogs_div_tag = readlogs.read('development.log')
  end
end

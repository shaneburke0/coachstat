class HomeController < ApplicationController
  require 'ReadLogs'
  def index
    readlogs = ::ReadLogs.new
    @readlogs_div_tag = readlogs.read('development.log')
  end
end

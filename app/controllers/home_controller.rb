class HomeController < ApplicationController
  
  def index
    if current_user.try(:admin?)
      redirect_to "/admin"
    end
  end
end

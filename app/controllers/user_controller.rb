class UserController < ApplicationController
  def login 
  end 
 
  def admin_login 
    session[:login] = 1 
    flash[:notice] = "Admin user successfully logged in." 
    redirect_to :controller => :admin 
  end 
 
  def logout 
    session[:login] = nil 
    flash[:notice] = "User logged out." 
    redirect_to :controller => :home 
  end 
 
end

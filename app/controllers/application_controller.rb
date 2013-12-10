class ApplicationController < ActionController::Base 
  protect_from_forgery 
 
  def after_sign_in_path_for(resource)     
    if resource.admin?
        "/admin"
      else
        "/"
    end 
  end 
 
  def authenticate_admin!
     unless current_user.try(:admin?)
      flash[:error] = "You must be an admin to access this section"
      redirect_to "/" # halts request cycle
    end
  end
 
end

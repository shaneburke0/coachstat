class UsersController < ApplicationController
  before_filter :authenticate_admin!
  
 
  # GET /users                                             
  # GET /users.json                                       HTML and AJAX
  #-----------------------------------------------------------------------
  def index
    @users = User.all
    respond_to do |format|
      format.json { render :json => @users }
      format.html
    end
  end
 
  # GET /users/new                                           
  # GET /users/new.json                                    HTML AND AJAX
  #-------------------------------------------------------------------
  def new
    @user = User.new
    respond_to do |format|
      format.json { render :json => @user }   
      format.html
    end
  end
 
  # GET /users/1                                                     
  # GET /users/1.json                                     HTML AND AJAX
  #-------------------------------------------------------------------
  def show
    @user = User.find(params[:id])
    respond_to do |format|
      format.json { render :json => @user }
      format.html      
    end
 
  rescue ActiveRecord::RecordNotFound
    respond_to_not_found(:json, :html)
  end
 
  # GET /users/1/edit                                                                                                            
  # GET /users/1/edit.json                                HTML AND AJAX
  #-------------------------------------------------------------------
  def edit
    
    @user = User.find(params[:id])
    
    respond_to do |format|
      format.json { render :json => @user }   
      format.html
    end
 
  rescue ActiveRecord::RecordNotFound
    respond_to_not_found(:json, :html)
  end
 
  # DELETE /users/1     
  # DELETE /users/1.json                                  HTML AND AJAX
  #-------------------------------------------------------------------
  def destroy
    @user = User.find(params[:id])
    @user.destroy
 
    respond_to do |format|
      format.html { redirect_to users_url }
      format.json { head :no_content }
    end
  end
  
  # PUT /users/1
  # PUT /users/1.json
  def update
    @user = User.find(params[:id])
    
    respond_to do |format|
      if params[:user][:password].present? && params[:user][:password_confirmation].present?
        if @user.update_attributes :password => params[:user][:password], :password_confirmation => params[:user][:password_confirmation], :email => params[:user][:email]
          format.html { redirect_to @user, notice: 'User was successfully updated.' }
          format.json { head :no_content }
        else
          format.html { render action: "edit" }
          format.json { render json: @user.errors, status: :unprocessable_entity }
        end 
      else
        if @user.update_attribute :email, params[:user][:email]
          format.html { redirect_to @user, notice: 'User was successfully updated.' }
          format.json { head :no_content }
        else
          format.html { render action: "edit" }
          format.json { render json: @user.errors, status: :unprocessable_entity }
        end 
      end
    end
  end
 
  # POST /users
  # POST /users.json                                      HTML AND AJAX
  #-----------------------------------------------------------------
  def create
    @user = User.new(params[:user])
 
    if @user.save
      respond_to do |format|
        format.json { render :json => @user.to_json, :status => 200 }
        format.html { redirect_to :action => :index }
      end
    else
      respond_to do |format|
        format.json { render :text => "Could not create user", :status => :unprocessable_entity } # placeholder
        format.html { render :action => :new, :status => :unprocessable_entity }
      end
    end
  end
end

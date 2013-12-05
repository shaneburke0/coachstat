class GamestatsController < ApplicationController
  # GET /gamestats
  # GET /gamestats.json
  def index
    @gamestats = Gamestat.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @gamestats }
    end
  end

  # GET /gamestats/1
  # GET /gamestats/1.json
  def show
    @gamestat = Gamestat.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @gamestat }
    end
  end

  # GET /gamestats/new
  # GET /gamestats/new.json
  def new
    @gamestat = Gamestat.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @gamestat }
    end
  end

  # GET /gamestats/1/edit
  def edit
    @gamestat = Gamestat.find(params[:id])
  end

  # POST /gamestats
  # POST /gamestats.json
  def create
    @gamestat = Gamestat.new(params[:gamestat])

    respond_to do |format|
      if @gamestat.save
        format.html { redirect_to @gamestat, notice: 'Gamestat was successfully created.' }
        format.json { render json: @gamestat, status: :created, location: @gamestat }
      else
        format.html { render action: "new" }
        format.json { render json: @gamestat.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /gamestats/1
  # PUT /gamestats/1.json
  def update
    @gamestat = Gamestat.find(params[:id])

    respond_to do |format|
      if @gamestat.update_attributes(params[:gamestat])
        format.html { redirect_to @gamestat, notice: 'Gamestat was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @gamestat.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /gamestats/1
  # DELETE /gamestats/1.json
  def destroy
    @gamestat = Gamestat.find(params[:id])
    @gamestat.destroy

    respond_to do |format|
      format.html { redirect_to gamestats_url }
      format.json { head :no_content }
    end
  end
  
  def getGameStats
    @gamestats = Gamestat.where('fixtureid' => params[:fixtureid])

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @gamestats }
    end
  end
  
  def updategame
    @gamestats = JSON.parse(params[:clubs])
    
    respond_to do |format|
      @gamestats.each do |p|
        @gamestat = Gamestat.find(p["id"])
        @gamestat[:goals] = p["goals"]
        @gamestat[:passmissed] = p["passmissed"]
        @gamestat[:passsuccess] = p["passsuccess"]
        @gamestat[:rc] = p["rc"]
        @gamestat[:shotstarget] = p["shotstarget"]
        @gamestat[:shotswide] = p["shotswide"]
        @gamestat[:yc] = p["yc"]
        @gamestat[:clearances] = p["clearances"]
        @gamestat[:corners] = p["corners"]
        @gamestat[:crossmissed] = p["crossmissed"]
        @gamestat[:crosssuccess] = p["crosssuccess"]
        @gamestat[:fouls] = p["fouls"]
        @gamestat[:offsides] = p["offsides"]
        @gamestat[:possession] = p["possession"]
        @gamestat[:tackleslost] = p["tackleslost"]
        @gamestat[:tackleswon] = p["tackleswon"]
        @gamestat[:fixtureid] = p["fixtureid"]
        @gamestat[:clubid] = p["clubid"]
        @gamestat.update_attributes(params[:gamestat])
      end
      
      format.json { head :no_content }
    end
    
  end
  def getClubStats
    @gamestats = Gamestat.where('clubid' => params[:clubid])

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @gamestats }
    end
  end
  
  def createMultiple 
    @gamestats = JSON.parse(params[:clubs])
    
    respond_to do |format|
      @gamestats.each do |p|
        @gamestat = Gamestat.new
        @gamestat[:goals] = p["goals"]
        @gamestat[:passmissed] = p["passmissed"]
        @gamestat[:passsuccess] = p["passsuccess"]
        @gamestat[:rc] = p["rc"]
        @gamestat[:shotstarget] = p["shotstarget"]
        @gamestat[:shotswide] = p["shotswide"]
        @gamestat[:yc] = p["yc"]
        @gamestat[:clearances] = p["clearances"]
        @gamestat[:corners] = p["corners"]
        @gamestat[:crossmissed] = p["crossmissed"]
        @gamestat[:crosssuccess] = p["crosssuccess"]
        @gamestat[:fouls] = p["fouls"]
        @gamestat[:offsides] = p["offsides"]
        @gamestat[:possession] = p["possession"]
        @gamestat[:tackleslost] = p["tackleslost"]
        @gamestat[:tackleswon] = p["tackleswon"]
        @gamestat[:fixtureid] = p["fixtureid"]
        @gamestat[:clubid] = p["clubid"]
        @gamestat.save
      end
      format.html # index.html.erb
      format.json { render json: @gamestats, status: :created, location: @gamestats }
    end
  end
end

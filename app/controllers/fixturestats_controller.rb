class FixturestatsController < ApplicationController
  # GET /fixturestats
  # GET /fixturestats.json
  def index
    @fixturestats = Fixturestat.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @fixturestats }
    end
  end

  # GET /fixturestats/1
  # GET /fixturestats/1.json
  def show
    @fixturestat = Fixturestat.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @fixturestat }
    end
  end

  # GET /fixturestats/new
  # GET /fixturestats/new.json
  def new
    @fixturestat = Fixturestat.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @fixturestat }
    end
  end

  # GET /fixturestats/1/edit
  def edit
    @fixturestat = Fixturestat.find(params[:id])
  end

  # POST /fixturestats
  # POST /fixturestats.json
  def create
    @fixturestat = Fixturestat.new(params[:fixturestat])

    respond_to do |format|
      if @fixturestat.save
        format.html { redirect_to @fixturestat, notice: 'Fixturestat was successfully created.' }
        format.json { render json: @fixturestat, status: :created, location: @fixturestat }
      else
        format.html { render action: "new" }
        format.json { render json: @fixturestat.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /fixturestats/1
  # PUT /fixturestats/1.json
  def update
    @fixturestat = Fixturestat.find(params[:id])

    respond_to do |format|
      if @fixturestat.update_attributes(params[:fixturestat])
        format.html { redirect_to @fixturestat, notice: 'Fixturestat was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @fixturestat.errors, status: :unprocessable_entity }
      end
    end
  end
  
  def deletePlayer 
    @fixturestat = Fixturestat.where('fixtureid' => params[:fixtureid], 'playerid' => params[:playerid]).first
    @fixturestat.destroy

    respond_to do |format|
      format.html { redirect_to fixturestats_url }
      format.json { head :no_content }
    end
  end
  
  def getPlayer 
    @fixturestat = Fixturestat.where('fixtureid' => params[:fixtureid], 'playerid' => params[:playerid]).first

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @fixturestat }
    end
  end
  
  def updateAllPlayers
    @players = JSON.parse(params[:players])
    
    respond_to do |format|
      @players.each do |p|
        @fixturestat = Fixturestat.find(p["id"])
        @fixturestat[:mins] = p["mins"]
        @fixturestat[:goals] = p["goals"]
        @fixturestat[:og] = p["og"]
        @fixturestat[:passmissed] = p["passmissed"]
        @fixturestat[:passsuccess] = p["passsuccess"]
        @fixturestat[:rc] = p["rc"]
        @fixturestat[:shotstarget] = p["shotstarget"]
        @fixturestat[:shotswide] = p["shotswide"]
        @fixturestat[:tackleslost] = p["tackleslost"]
        @fixturestat[:tackleswon] = p["tackleswon"]
        @fixturestat[:yc] = p["yc"]
        @fixturestat[:assists] = p["assists"]
        @fixturestat.update_attributes(params[:fixturestat])
      end
      
      format.json { head :no_content }
    end
  end

  # DELETE /fixturestats/1
  # DELETE /fixturestats/1.json
  def destroy
    @fixturestat = Fixturestat.find(params[:id])
    @fixturestat.destroy

    respond_to do |format|
      format.html { redirect_to fixturestats_url }
      format.json { head :no_content }
    end
  end
end

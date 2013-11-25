class LineupplayersController < ApplicationController
  # GET /lineupplayers
  # GET /lineupplayers.json
  def index
    @lineupplayers = Lineupplayer.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @lineupplayers }
    end
  end
  
  def lineup
    @lineupplayers = Lineupplayer.where('lineupid' => params[:lineupid])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @lineupplayers }
    end
  end

  # GET /lineupplayers/1
  # GET /lineupplayers/1.json
  def show
    @lineupplayer = Lineupplayer.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @lineupplayer }
    end
  end
  
  def getPlayer
    @lineupplayer = Lineupplayer.where('lineupid' => params[:id], 'playerid' => params[:playerid])

    respond_to do |format|
      format.json { render json: @lineupplayer }
    end
  end

  # GET /lineupplayers/new
  # GET /lineupplayers/new.json
  def new
    @lineupplayer = Lineupplayer.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @lineupplayer }
    end
  end

  # GET /lineupplayers/1/edit
  def edit
    @lineupplayer = Lineupplayer.find(params[:id])
  end

  # POST /lineupplayers
  # POST /lineupplayers.json
  def create
    @lineupplayer = Lineupplayer.new(params[:lineupplayer])

    respond_to do |format|
      if @lineupplayer.save
        format.html { redirect_to @lineupplayer, notice: 'Lineupplayer was successfully created.' }
        format.json { render json: @lineupplayer, status: :created, location: @lineupplayer }
      else
        format.html { render action: "new" }
        format.json { render json: @lineupplayer.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /lineupplayers/1
  # PUT /lineupplayers/1.json
  def update
    @lineupplayer = Lineupplayer.find(params[:id])

    respond_to do |format|
      if @lineupplayer.update_attributes(params[:lineupplayer])
        format.html { redirect_to @lineupplayer, notice: 'Lineupplayer was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @lineupplayer.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /lineupplayers/1
  # DELETE /lineupplayers/1.json
  def destroy
    @lineupplayer = Lineupplayer.find(params[:id])
    @lineupplayer.destroy

    respond_to do |format|
      format.html { redirect_to lineupplayers_url }
      format.json { head :no_content }
    end
  end
end

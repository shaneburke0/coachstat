class LogsController < ApplicationController
  require 'ReadLogs'
  require 'Kaminari'
  before_filter :authenticate_admin!
  # GET /logs
  # GET /logs.json
  def index
    myarray = Log.all
    @logs = Kaminari.paginate_array(myarray).page(params[:page])
    
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @logs }
    end
  end

  # GET /logs/1
  # GET /logs/1.json
  def show
    @log = Log.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @log }
    end
  end

  # GET /logs/new
  # GET /logs/new.json
  def new
    @log = Log.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @log }
    end
  end

  # GET /logs/1/edit
  def edit
    @log = Log.find(params[:id])
  end

  # POST /logs
  # POST /logs.json
  def create
    @log = Log.new(params[:log])

    respond_to do |format|
      if @log.save
        format.html { redirect_to @log, notice: 'Log was successfully created.' }
        format.json { render json: @log, status: :created, location: @log }
      else
        format.html { render action: "new" }
        format.json { render json: @log.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /logs/1
  # PUT /logs/1.json
  def update
    @log = Log.find(params[:id])

    respond_to do |format|
      if @log.update_attributes(params[:log])
        format.html { redirect_to @log, notice: 'Log was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @log.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /logs/1
  # DELETE /logs/1.json
  def destroy
    @log = Log.find(params[:id])
    @log.destroy

    respond_to do |format|
      format.html { redirect_to logs_url }
      format.json { head :no_content }
    end
  end
  
  def storelogs
    readlogs = ::ReadLogs.new
    @logs = readlogs.read('development.log')
    
    @logs.each do |l|
      @newlog = Log.new
      @newlog[:message] = l
      # regex for 2013-12-11 14:18:33
      @newlog[:date] = l.scan(/([1]{1}[9]{1}[9]{1}\d{1}|[2-9]{1}\d{3})\-([0-2]?\d{1}|[3][0,1]{1})\-([0,1]?\d{1})\s([0]?\d|1\d|2[0-3]):([0-5]\d):([0-5]\d)$/) 
      
      if l =~ /GET/
        @newlog[:method] = "GET"
      elsif l =~ /POST/
        @newlog[:method] = "POST"
      elsif l =~ /PUT/
        @newlog[:method] = "PUT"
      elsif l =~ /DELETE/
        @newlog[:method] = "DELETE"
      else
        @newlog[:method] = ""
      end
      @newlog.save
    end
    redirect_to "/logs"
  end
end

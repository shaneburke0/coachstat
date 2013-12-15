class AnalyserController < ApplicationController
  before_filter :authenticate_admin!
  require 'statanalyser'
  
  def index
    @players = Fixturestat.all
  end
  
  def passing
    stats = Statanalyser::Analyser.new
    player1 = Fixturestat.find(params[:player1id])
    player2 = Fixturestat.find(params[:player2id])
    
    @result = stats.PassAccuracy(player1, player2)
  end

  def tackling
    stats = Statanalyser::Analyser.new
    player1 = Fixturestat.find(params[:player1id])
    player2 = Fixturestat.find(params[:player2id])
    
    @result = stats.TackleAccuracy(player1, player2)
  end

  def shooting
    stats = Statanalyser::Analyser.new
    player1 = Fixturestat.find(params[:player1id])
    player2 = Fixturestat.find(params[:player2id])
    
    @result = stats.ShotAccuracy(player1, player2)
  end
end

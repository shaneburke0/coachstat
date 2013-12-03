require 'test_helper'

class GamestatsControllerTest < ActionController::TestCase
  setup do
    @gamestat = gamestats(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:gamestats)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create gamestat" do
    assert_difference('Gamestat.count') do
      post :create, gamestat: { clearances: @gamestat.clearances, corners: @gamestat.corners, crossmissed: @gamestat.crossmissed, crosssuccess: @gamestat.crosssuccess, fouls: @gamestat.fouls, goals: @gamestat.goals, offsides: @gamestat.offsides, passmissed: @gamestat.passmissed, passsuccess: @gamestat.passsuccess, possession: @gamestat.possession, rc: @gamestat.rc, shotstarget: @gamestat.shotstarget, shotswide: @gamestat.shotswide, tackleslost: @gamestat.tackleslost, tackleswon: @gamestat.tackleswon, yc: @gamestat.yc }
    end

    assert_redirected_to gamestat_path(assigns(:gamestat))
  end

  test "should show gamestat" do
    get :show, id: @gamestat
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @gamestat
    assert_response :success
  end

  test "should update gamestat" do
    put :update, id: @gamestat, gamestat: { clearances: @gamestat.clearances, corners: @gamestat.corners, crossmissed: @gamestat.crossmissed, crosssuccess: @gamestat.crosssuccess, fouls: @gamestat.fouls, goals: @gamestat.goals, offsides: @gamestat.offsides, passmissed: @gamestat.passmissed, passsuccess: @gamestat.passsuccess, possession: @gamestat.possession, rc: @gamestat.rc, shotstarget: @gamestat.shotstarget, shotswide: @gamestat.shotswide, tackleslost: @gamestat.tackleslost, tackleswon: @gamestat.tackleswon, yc: @gamestat.yc }
    assert_redirected_to gamestat_path(assigns(:gamestat))
  end

  test "should destroy gamestat" do
    assert_difference('Gamestat.count', -1) do
      delete :destroy, id: @gamestat
    end

    assert_redirected_to gamestats_path
  end
end

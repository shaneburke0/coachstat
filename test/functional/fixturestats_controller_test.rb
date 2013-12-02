require 'test_helper'

class FixturestatsControllerTest < ActionController::TestCase
  setup do
    @fixturestat = fixturestats(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:fixturestats)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create fixturestat" do
    assert_difference('Fixturestat.count') do
      post :create, fixturestat: { assists: @fixturestat.assists, fixtureid: @fixturestat.fixtureid, goals: @fixturestat.goals, mins: @fixturestat.mins, og: @fixturestat.og, passmissed: @fixturestat.passmissed, passsuccess: @fixturestat.passsuccess, playerid: @fixturestat.playerid, rc: @fixturestat.rc, shotstarget: @fixturestat.shotstarget, shotswide: @fixturestat.shotswide, tackleslost: @fixturestat.tackleslost, tackleswom: @fixturestat.tackleswom, yc: @fixturestat.yc }
    end

    assert_redirected_to fixturestat_path(assigns(:fixturestat))
  end

  test "should show fixturestat" do
    get :show, id: @fixturestat
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @fixturestat
    assert_response :success
  end

  test "should update fixturestat" do
    put :update, id: @fixturestat, fixturestat: { assists: @fixturestat.assists, fixtureid: @fixturestat.fixtureid, goals: @fixturestat.goals, mins: @fixturestat.mins, og: @fixturestat.og, passmissed: @fixturestat.passmissed, passsuccess: @fixturestat.passsuccess, playerid: @fixturestat.playerid, rc: @fixturestat.rc, shotstarget: @fixturestat.shotstarget, shotswide: @fixturestat.shotswide, tackleslost: @fixturestat.tackleslost, tackleswom: @fixturestat.tackleswom, yc: @fixturestat.yc }
    assert_redirected_to fixturestat_path(assigns(:fixturestat))
  end

  test "should destroy fixturestat" do
    assert_difference('Fixturestat.count', -1) do
      delete :destroy, id: @fixturestat
    end

    assert_redirected_to fixturestats_path
  end
end

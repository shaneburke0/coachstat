require 'test_helper'

class LineupplayersControllerTest < ActionController::TestCase
  setup do
    @lineupplayer = lineupplayers(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:lineupplayers)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create lineupplayer" do
    assert_difference('Lineupplayer.count') do
      post :create, lineupplayer: { captain: @lineupplayer.captain, id: @lineupplayer.id, lineupid: @lineupplayer.lineupid, playerid: @lineupplayer.playerid, suboff: @lineupplayer.suboff, subon: @lineupplayer.subon }
    end

    assert_redirected_to lineupplayer_path(assigns(:lineupplayer))
  end

  test "should show lineupplayer" do
    get :show, id: @lineupplayer
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @lineupplayer
    assert_response :success
  end

  test "should update lineupplayer" do
    put :update, id: @lineupplayer, lineupplayer: { captain: @lineupplayer.captain, id: @lineupplayer.id, lineupid: @lineupplayer.lineupid, playerid: @lineupplayer.playerid, suboff: @lineupplayer.suboff, subon: @lineupplayer.subon }
    assert_redirected_to lineupplayer_path(assigns(:lineupplayer))
  end

  test "should destroy lineupplayer" do
    assert_difference('Lineupplayer.count', -1) do
      delete :destroy, id: @lineupplayer
    end

    assert_redirected_to lineupplayers_path
  end
end

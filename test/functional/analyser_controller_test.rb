require 'test_helper'

class AnalyserControllerTest < ActionController::TestCase
  test "should get passing" do
    get :passing
    assert_response :success
  end

  test "should get tackling" do
    get :tackling
    assert_response :success
  end

  test "should get shooting" do
    get :shooting
    assert_response :success
  end

end

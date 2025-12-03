require "test_helper"

class YearsControllerTest < ActionDispatch::IntegrationTest
  test "returns descending years including current year" do
    get "/years"
    assert_response :success

    body = JSON.parse(response.body)
    assert body["years"].is_a?(Array), "expected years array in response"
    assert_includes body["years"], Date.current.year
    assert_operator body["years"].first, :>=, body["years"].last
  end
end

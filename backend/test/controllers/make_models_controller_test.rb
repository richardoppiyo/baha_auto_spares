require "test_helper"

class MakeModelsControllerTest < ActionDispatch::IntegrationTest
  test "returns a list of make/models" do
    get "/make_models"
    assert_response :success

    body = JSON.parse(response.body)
    assert body["make_models"].is_a?(Array), "expected make_models array in response"
    assert_includes body["make_models"], "Toyota Camry"
  end
end

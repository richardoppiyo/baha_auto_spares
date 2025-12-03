class MakeModelsController < ApplicationController
  def index
    make_models = [
      "Toyota Camry",
      "Toyota Corolla",
      "Honda Accord",
      "Honda Civic",
      "Ford F-150",
      "Subaru Forester",
    ]

    render json: { make_models: make_models }
  end
end

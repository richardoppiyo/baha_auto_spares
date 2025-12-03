class YearsController < ApplicationController
  def index
    years = (1890..Date.current.year).to_a.reverse
    render json: { years: years }
  end
end

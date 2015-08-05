class ImpacQueriesController < ApplicationController
  def show
    query = ImpacQuery.new
    @results = query.employees
  end
end

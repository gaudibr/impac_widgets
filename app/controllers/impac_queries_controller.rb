class ImpacQueriesController < ApplicationController
  
  def initialize
    @query = ImpacQuery.new
  end
  
  def employees
    @results = JSON.parse @query.employees.body
  end
  
  def show
    results = JSON.parse @query.employees.body
    
    respond_with employees_location(get_employee_data(results)).to_json
  end
  
  def get_employee_data results
    results['content']['employees']
  end
  def employees_location employees
    locations = Array.new
    employees.each do  |emp|
      locations << {
        :name => emp['address'],
        :position => (Geocoder.coordinates emp['address']),
        :count => 1
      }
    end
    locations
  end
  
  def reduce_locations locations
    locations_reduced = Array.new
  end
end

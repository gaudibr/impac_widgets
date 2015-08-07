class ImpacQueriesController < ApplicationController
  
  def initialize
    @query = ImpacQuery.new
  end

  def employees_data
    results = JSON.parse @query.employees_list.body
    employees_data = results['content']['employees']
    
    respond_with employees_location(employees_data).to_json
  end
  
  def employees_location employees
    locations = Array.new
    employees.each do  |emp|
      locations << {
        :name => emp['address'],
        :position => (Geocoder.coordinates emp['address']),
      }
    end
    locations
  end
end

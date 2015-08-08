class ImpacQueriesController < ApplicationController
  
  def initialize
    @query = ImpacQuery.new
  end

  def employees_data
    results = JSON.parse @query.employees_list.body
    employees_data = results['content']['employees']
    
    respond_with employees_location(employees_data).to_json
  end
  
  def invoice_data
    results = JSON.parse @query.sales_channel(params[:type]).body
    invoice_data = results["content"]["entities"]
    
    respond_with sales_channels(invoice_data).to_json
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
  
  def sales_channels entities
    totals = Array.new
    entities.each do |ent|
      loc = ent['address']['l'],
      state = ent['address']['r'],
      zip = ent['address']['z'],
      country = ent['address']['c']
      totals << {
        :name => ent['name'],
        :amount_invoiced => ent['total_invoiced'],
        :location => loc,
        :state => state,
        :zip => zip,
        :country => country,
        :position => (Geocoder.coordinates loc.to_s)
      }
    end
    totals
  end
  
  def get_position(location, state, zip, country)
    
  end
end

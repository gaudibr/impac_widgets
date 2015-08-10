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
        :position => (get_position emp['address']),
      }
    end
    locations
  end
  
  def sales_channels entities
    totals = Array.new
    entities.each do |ent|
      totals << {
        :name => ent['name'],
        :amount_invoiced => ent['total_invoiced'],
        :position => (get_position( ent['address'], ent['name']))
      }
    end
    totals
  end
  
  def get_position address, name = nil
    position = ""
    if address.is_a?(String)
      position = Geocoder.coordinates address
    elsif address.is_a?(Hash)
      loc = address['l']
      state = address['r']
      zip = address['z']
      country = address['c']
      location_string = "#{loc+" ," unless loc =="-"} #{state+" ," unless state =="-"} #{zip+" ," unless zip =="-"} #{country unless country =="-"}"
      position = Geocoder.coordinates location_string unless location_string.blank?
      if location_string.blank?
        position = Geocoder.coordinates name
      end
    end
    position
  end
end
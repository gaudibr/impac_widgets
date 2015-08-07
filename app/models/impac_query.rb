class ImpacQuery
  include HTTParty
  
  base_uri 'api-impac-uat.maestrano.io/api/v1' 
  
  def initialize
    u = Rails.application.secrets.maestrano_api_user
    p = Rails.application.secrets.maestrano_api_pass
    
    @auth = {username: u, password: p}
  end
  
  def employees_list
    query = { "metadata" => {"organization_ids" => ["org-fbte"]}, "engine" => "hr/employees_list" }
    get_data query
  end
  
  def employee_details
    query = { "metadata" => {"organization_ids" => ["org-fbte"]}, "engine" => "hr/employee_details" }
    get_data query
  end
  
  def sales_channel
    query = { "metadata" => {"organization_ids" => ["org-fbte"], "entity" => "customers"}, "engine" => "invoices/list" }
    get_data query
  end
  
  def get_data query, options = {}
    options.merge!({basic_auth: @auth})
    query = query
    options.merge!({query: query})
    self.class.get("/get_widget", options)
  end
end
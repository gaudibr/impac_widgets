class ImpacQuery
  include HTTParty
  
  base_uri 'api-impac-uat.maestrano.io/api/v1' 
  
  def initialize
    u = Rails.application.secrets.maestrano_api_user
    p = Rails.application.secrets.maestrano_api_pass
    
    @auth = {username: u, password: p}
    @options = {}
  end
  
  def employees_list
    query = { "metadata" => {"organization_ids" => ["org-fbte"]}, "engine" => "hr/employees_list" }
    get_data query
  end
  
  def sales_channel type
    query = { "metadata" => {"organization_ids" => ["org-fbte"], "entity" => type}, "engine" => "invoices/list" }
    get_data query
  end
  
  def get_data query
    @options.merge!({basic_auth: @auth})
    @options.merge!({query: query})
    self.class.get("/get_widget", @options)
  end
end
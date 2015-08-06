class ImpacQuery
  include HTTParty
  
  base_uri 'api-impac-uat.maestrano.io/api/v1' 
  
  def initialize
    u = Rails.application.secrets.maestrano_api_user
    p = Rails.application.secrets.maestrano_api_pass
    
    @auth = {username: u, password: p}
  end
  
  def employees(options = {})
    options.merge!({basic_auth: @auth})
    query = { "metadata" => {"organization_ids" => ["org-fbte"]}, "engine" => "hr/employees_list" }
    options.merge!({query: query})
    self.class.get("/get_widget", options)

  end
end

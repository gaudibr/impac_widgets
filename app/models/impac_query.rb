class ImpacQuery
  include HTTParty
  
  base_uri 'api-impac-uat.maestrano.io/api/v1' 
  
  def initialize
    u = "72db99d0-05dc-0133-cefe-22000a93862b"
    p = "_cIOpimIoDi3RIviWteOTA"
    @auth = {username: u, password: p}
  end
  
  def employees(options = {})
    options.merge!({basic_auth: @auth})
    query = { "metadata" => {"organization_ids" => ["org-fbte"]}, "engine" => "hr/employees_list" }
    options.merge!({query: query})
    self.class.get("/get_widget", options)
  end
end

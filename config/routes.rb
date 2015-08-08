Rails.application.routes.draw do
  root to: 'application#angular'
  
  match   '/employees' => 'impac_queries#employees_data', via: [:get], :defaults => { :format => 'json' }
  
  match   '/invoices/:type' => 'impac_queries#invoice_data', via: [:get], :defaults => { :format => 'json' }
end

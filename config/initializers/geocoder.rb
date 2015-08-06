Geocoder.configure(
  :lookup => :google, 
  :use_https => true, 
  :api_key => Rails.application.secrets.google_api_key)
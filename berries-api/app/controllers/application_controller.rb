class ApplicationController < ActionController::API
  # include Knock::Authenticable
  include ActionController::HttpAuthentication::Token::ControllerMethods
end

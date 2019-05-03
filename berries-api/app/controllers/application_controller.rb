class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include ActionController::Cookies
  

  def current_user
    #doesnt work
    @current_user ||= User.find_by(auth_token: cookies[:user_id])
  end

end
                                                                                                                                                                                                                                                                                                                           
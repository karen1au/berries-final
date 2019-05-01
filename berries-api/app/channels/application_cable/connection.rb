module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user
  
    def connect
        self.current_user = find_verified_user
        logger.add_tags current_user.email
    end
  
    private
      
    def find_verified_user
        puts "TOKEEEEN", request.params[:token]
        User.find_by(auth_token: request.params[:token]) ||
            reject_unauthorized_connection
    end
  end
end
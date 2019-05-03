module Api::V1
  class SessionsController < ApiController
    skip_before_action :require_login, only: [:create], raise: false

    def create
      puts "SESSION CREATE", params
      if user = User.validate_login(params[:email], params[:password])
        allow_token_to_be_used_only_once_for(user)
        send_token_for_valid_login_of(user)
      else
        render_unauthorized("Error with your login or password")
      end
    end

    def destroy
      logout
      head :ok
    end

    private


    def allow_token_to_be_used_only_once_for(user)
      user.regenerate_auth_token    
    end

    def send_token_for_valid_login_of(user)
      cookies[:user_id] = user.id
      render json: { token: user.auth_token, user_id: user.id}
    end

    def logout
      current_user.invalidate_token
    end
  end
end

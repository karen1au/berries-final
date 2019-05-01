module Api::V1
  class SessionsController < Devise::SessionsController
    skip_before_action :verify_authenticity_token, only: [:create], raise: false

    def create
#       puts "SESSION CREATE", params
        user = User.find_for_authentication(email: params[:email]) 
        if user.valid_password?(params[:password])
          sign_in(User.find_by(email: params[:email]), scope: :user)
        # user = User.valid_password?(params[:email], params[:password])
        render json: { user: user.email }
#         allow_token_to_be_used_only_once_for(user)
#         send_token_for_valid_login_of(user)
      else
        render json: { error: user.email }
#         render_unauthorized("Error with login or password")
      end
    end

#     def destroy
#       logout
#       head :ok
#     end

#     private

#     def allow_token_to_be_used_only_once_for(user)
#       user.regenerate_auth_token    
#     end

#     def send_token_for_valid_login_of(user)
#       render json: { token: user.auth_token}
#     end

#     def logout
#       current_user.invalidate_token
#     end
  end
end

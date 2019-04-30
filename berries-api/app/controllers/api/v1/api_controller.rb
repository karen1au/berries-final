module Api::V1
  class ApiController < ApplicationController
    def require_login
      authenticate_token || render_unauthorized("Access denied")
    end

    def current_user
      @current_user ||= authenticate_token
    end

    protected

    def render_unauthorized(msg)
      errors = { errors: [ detail: msg ] }
      render json: errors, status: :unauthorized
    end

    private

    def authenticate_token
      authenticate_with_http_token do | token, options |
        User.find_by(auth_token: token)
      end
    end
  end
end

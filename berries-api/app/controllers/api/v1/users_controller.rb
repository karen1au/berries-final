module Api::V1
  class UsersController < ApplicationController
    def index
      @users = User.where(location: 'Toronto')
      render json: @users
    end
  end
end
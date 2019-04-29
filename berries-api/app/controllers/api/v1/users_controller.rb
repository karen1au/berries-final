module Api::V1
  class UsersController < ApplicationController
    def index
      @users = User.all
      render json: @users
    end

    def search
      #query = "SELECT * FROM Users INNER JOIN"
      #puts @users = ActiveRecord::Base.connection.exec_query(query)
      #byebug
      @users = User.where(location: 'Toronto', commitment: params[:q1])
      render json: @users
    end
  end
end
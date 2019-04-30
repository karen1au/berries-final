module Api::V1
  class UsersController < ApplicationController
    def index
      @users = User.all
      render json: @users
    end

    def search
      #
      #puts @users = ActiveRecord::Base.connection.exec_query(query)
      #byebug
      @users = User.where(location: 'Toronto', commitment: params[:q1]).joins(user_genres: :genre).where('genres.name' => params[:q2]).joins(user_exps: :instrument).where('instruments.name' => params[:q3]).joins(:user_exps).where('user_exps.years' => params[:q4])
      render json: @users
    end
  end
end
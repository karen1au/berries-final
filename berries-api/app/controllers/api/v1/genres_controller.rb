module Api::V1
  class GenresController < ApplicationController
    def index
      @genres = Genre.all
      render json: @genres
    end

    def search
      puts "start genres! ---------"
      puts params
      puts "end genres! ----------"
      @genres = Genre.joins(user_genres: :user).where('users.id' => params[:user])
      render json: @genres
    end  

    def show
    end
  end
end
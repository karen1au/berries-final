module Api::V1
  class UserGenresController < ApplicationController
    
    def destroy
      puts '--->', params
      @genre = Genre.find_by_name(params[:genre])
      @user_genre = UserGenre.where('user_id' => params[:id]).where('genre_id' => @genre.id)
      @user_genre.first.destroy
    end
  end
end
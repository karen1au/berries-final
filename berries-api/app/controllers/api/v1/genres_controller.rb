module Api::V1
  class GenresController < ApplicationController
    def index
      @genres = Genre.all
      render json: @genres
    end
  end
end
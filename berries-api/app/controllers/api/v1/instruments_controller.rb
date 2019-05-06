module Api::V1
  class InstrumentsController < ApplicationController
    def index
      @instruments = Instrument.all
      render json: @instruments
    end
    
    def search
      @instruments = Instrument.joins(user_exps: :user).where('users.id' => params[:user])
      render json: @instruments
    end
  end
end
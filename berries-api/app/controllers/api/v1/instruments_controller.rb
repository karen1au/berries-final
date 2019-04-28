module Api::V1
  class InstrumentsController < ApplicationController
    def index
      @instruments = Instrument.all
      render json: @instruments
    end
  end
end
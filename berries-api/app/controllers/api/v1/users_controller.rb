module Api::V1
  class UsersController < ApiController #ApplicationController
    #before_action :require_login, except: [:create]
    
    def index
      @users = User.all
      render json: @users
    end

    def search
      @users = User.where(location: 'Toronto')
      @users = @users.where(commitment: params[:currentCommitment]) if params[:currentCommitment].present?
      @users = @users.joins(user_exps: :instrument).where('instruments.name' => params[:currentInstrument]) if params[:currentInstrument].present?
      @users = @users.joins(user_genres: :genre).where('genres.name' => params[:currentGenre]) if params[:currentGenre].present?
      @users = @users.joins(:user_exps).where('user_exps.years' => params[:currentExperience]) if params[:currentExperience].present?

      #@users = User.where(location: 'Toronto').where(commitment: params[:q1]).joins(user_exps: :instrument).where('instruments.name' => params[:q2]).joins(user_genres: :genre).where('genres.name' => params[:q3]).joins(:user_exps).where('user_exps.years' => params[:q4])
      puts params
      render json: @users
    end
  
    def create  
      @user = User.new(user_params)
      if @user.save
        # geocode_user(@user)
        puts "user created!"
        render json: { token: @user.id}
      else
        puts @user.errors.full_messages
      end
    end

    private
    def user_params
      params.require(:user).permit(
        # :name,
        :email,
        :password,
        :password_confirmation
        # :avatar,
        # :band,
        # :location,
        # :commitment,
        # :soundcloud,
        # :youtube
      )
    end
    
    def geocode_user(user)
      address = Geokit::Geocoders::Googlecoder.geocde(user.location)
      user.lat = address.ll.split(',')[0]
      user.lng = address.ll.split(',')[1]
    end
  end
end
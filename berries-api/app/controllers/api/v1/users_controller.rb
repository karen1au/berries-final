module Api::V1
  class UsersController < ApiController #ApplicationController
    before_action :require_login, except: [:create]
    
    def index
      @users = User.where(location: 'Toronto')
      render json: @users
    end
  
    def create  
      @user = User.new(user_params)
      if @user.save
        # geocode_user(@user)
        puts "user created!"
        render json: { token: @user.auth_token}
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
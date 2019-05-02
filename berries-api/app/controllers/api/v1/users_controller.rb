module Api::V1
  class UsersController < ApiController #ApplicationController
    #before_action :require_login, except: [:create, :index]
    
    def index
      puts 'current_user--->'
      puts current_user
      puts @current_user
      #@somewhere = Geokit::Geocoders::GoogleGeocoder.geocode(current_user.location)
      @users = User.all
      render json: @users
    end

    def show
      @user = User.find_by_id(params[:id])
      render json: @user
    end

    def search
      #@somewhere = Geokit::Geocoders::GoogleGeocoder.geocode(current_user.location)
      #@users = User.within(50, :units => :kms, :origin => @somewhere.ll)
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
        UserGenre.new(genre_id: genre_params.id, user_id: @user.id)
        render json: { token: @user.auth_token}
      else
        puts @user.errors.full_messages
      end
    end

    def update
      puts 'user params', user_params
      puts 'genre params', genre_params
      @user = User.first
      if @user.update_attributes(user_params)
        geocode_user(@user)
        @user.save!
        
        genre_params.each do |genre|  
          @genre_id = Genre.find_by_name(genre)
          @user_genre = UserGenre.new(genre_id: @genre_id.id, user_id: @user.id)
          @user_genre.save!
        end  
        render json: @user
      else
        render json: { error: error }
      end
    end

    private
    def user_params
      params.require(:user).permit(
        :name,
        :email,
        :password,
        :password_confirmation,
        #:avatar,
        :band,
        :location,
        :commitment,
        :soundcloud,
        :youtube
      )
    end

    def genre_params
      params.require(:genre)
    end
    
    def geocode_user(user)
      address = Geokit::Geocoders::GoogleGeocoder.geocode(user.location)
      user.lat = address.ll.split(',')[0]
      user.lng = address.ll.split(',')[1]
    end
  end
end
module Api::V1
  class UsersController < ApiController #ApplicationController
    #before_action :require_login, except: [:create, :index]
    
    def index
      puts 'params', params
      @current_user = User.find_by_id(JSON.parse(params[:user]))
      puts @current_user

      @somewhere = Geokit::Geocoders::GoogleGeocoder.geocode(@current_user.location)
      @users = User.within(50, :units => :kms, :origin => @somewhere.ll)
      @users = @users.where.not(id:params[:user])
      @users = @users.where.not(band: @current_user.band)
      puts 'index users: ', @users
      render json: @users
    end

    def show
      @user = User.find_by_id(params[:id])
      render json: @user
    end

    def search
      @current_user = User.find_by_id(JSON.parse(params[:user]))
      @somewhere = Geokit::Geocoders::GoogleGeocoder.geocode(@current_user.location)
      @users = User.within(50, :units => :kms, :origin => @somewhere.ll)
      @users = @users.where.not(id:params[:user])
      @users = @users.where.not(band: @current_user.band)
      @users = @users.where(commitment: params[:currentCommitment]) if params[:currentCommitment].present?
      @users = @users.joins(user_exps: :instrument).where('instruments.name' => params[:currentInstrument]) if params[:currentInstrument].present?
      @users = @users.joins(user_genres: :genre).where('genres.name' => params[:currentGenre]) if params[:currentGenre].present?
      @users = @users.joins(:user_exps).where('user_exps.years' => params[:currentExperience]) if params[:currentExperience].present?
      puts 'search users: ', @users
      render json: @users
    end
  
    def create  
      @user = User.new(user_params)
      if @user.save
        # geocode_user(@user)
        puts "user created!"

        render json: { token: @user.auth_token, user_id: @user.id}

      else
        puts @user.errors.full_messages
      end
    end

    def update
      @user = User.find_by_id(user_params[:id])

      if @user.update_attributes(user_params)
        geocode_user(@user)
        @user.save!
        puts 'user success', @user

        return

      else
        puts 'no user info'
      end

      if params[:instrument].present?
        
        instrument_params.each do |instrument|
          @instrument_id = Instrument.find_by_name(instrument["name"])
          @user_exp = UserExp.new(instrument_id: @instrument_id.id, user_id: @user.id, years: instrument["experience"])
          @user_exp.save!
        end
        
        puts 'instrument success', @user_exp
        return

      else
        puts 'no instruments'
      end
        
      if params[:genre].present?
        genre_params.each do |genre|  
          @genre_id = Genre.find_by_name(genre)
          @user_genre = UserGenre.new(genre_id: @genre_id.id, user_id: @user.id)
          @user_genre.save!
        end  
        
        puts 'genre success', @user_genre
        return

      else
        puts 'no genres'
      end
    end

    private
    def user_params
      params.require(:user).permit(
        :id,
        :name,
        :email,
        :password,
        :password_confirmation,
        :avatar,
        :band,
        :location,
        :commitment,
        :soundcloud,
        :youtube,
        :description
      )
    end

    def genre_params
      params.require(:genre)
    end

    def instrument_params
      params.require(:instrument)
    end
    
    def geocode_user(user)
      address = Geokit::Geocoders::GoogleGeocoder.geocode(user.location)
      user.lat = address.ll.split(',')[0]
      user.lng = address.ll.split(',')[1]
    end
  end
end
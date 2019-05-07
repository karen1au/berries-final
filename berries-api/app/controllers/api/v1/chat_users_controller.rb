module Api::V1
  class ChatUsersController < ApiController
    def index
      @related = Relationship.where(user1_id: params[:user])
                  .or(Relationship.where(user2_id: params[:user]))
                  .pluck(:user1_id, :user2_id).flatten!.uniq!
      @exclude_current = @related.reject { |n| n == params[:user].to_i}
      @filtered = []
      @exclude_current.each do |user|
        if !ChatUser.where(chat_id: params[:chat], user_id: user).present?
          @filtered << user
        end
      end
      @final = @filtered.map do |user|
        User.find(user)
      end
      # byebug
      render json: @final
    end

    def create
      @user_chat = ChatUser.new(user_id: params[:user], chat_id: params[:chat])
      if @user_chat.save
        puts "added user!"
      end
    end

    def destroy
      chat = ChatUser.find_by(chat_id: params[:chat_id], user_id: params[:user_id])
      chat.destroy
    end

  end
end
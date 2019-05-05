module Api::V1
  class ChatUsersController < ApiController
    def index
      @related = Relationship.where(user1_id: params[:user])
                  .or(Relationship.where(user2_id: params[:user]))
                  .pluck(:user1_id, :user2_id)
      @chat_user = ChatUser.where(chat_id: params[:chat]).pluck(:user_id)
      @filtered = @related << @chat_user
      @filtered.flatten!.uniq!.map do |user|
        User.find(user)
      end
      render json: @filtered
    end

    def destroy
      chat = ChatUser.find_by(chat_id: params[:chat_id], user_id: params[:user_id])
      chat.destroy
    end

  end
end
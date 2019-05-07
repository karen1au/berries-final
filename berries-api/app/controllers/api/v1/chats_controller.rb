module Api::V1
  class ChatsController < ApiController
    def index
        @chat = ChatUser.where(user_id: params[:user]).order(:created_at).select("chat_id")
        @user_of_chat = {}
        @chat.each do |chat|
          @user_of_chat[chat.chat_id] = ChatUser.where(chat_id: chat.chat_id).joins(:user).pluck(:avatar)
        end
        render json: @user_of_chat
    end

    def show
      @users = User.joins(:chat_users).where(chat_users: {chat_id: params[:id]})
      render json: @users
    end

  end
end
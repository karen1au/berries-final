module Api::V1
  class ChatsController < ApiController
    def index
        @chat = ChatUser.where(user_id: params[:user])
        render json: @chat
    end

    def show
      @users = User.joins(:chat_users).where(chat_users: {chat_id: params[:id]})
      render json: @users
    end

  end
end
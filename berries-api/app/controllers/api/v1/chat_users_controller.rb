module Api::V1
  class ChatUsersController < ApiController
    def destroy
      chat = ChatUser.find_by(chat_id: params[:chat_id], user_id: params[:user_id])
      chat.destroy
    end

  end
end
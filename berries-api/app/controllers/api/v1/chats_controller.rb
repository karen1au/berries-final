module Api::V1
  class ChatsController < ApiController
    def index
        # serialized_data = ActiveModelSerializers::Adapter::Json.new(
        #   NotificationSerializer.new(notification)
        # ).serializable_hash
        @chat = ChatUser.where(user_id: params[:user])
        render json: @chat
    end

    private
  
    # def chat_params
    #   params.require(:chat).permit(:creator_id)
    # end
  end
end
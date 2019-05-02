module Api::V1
  class MessagesController < ApiController
    def create
      message = Message.new(message_params)
      chat = Chat.find(message_params[:chat_id])
      if message.save
        serialized_data = ActiveModelSerializers::Adapter::Json.new(
          MessageSerializer.new(message)
        ).serializable_hash
        MessagesChannel.broadcast_to chat, serialized_data
        head :ok
      end
    end
    
    private
    
    def message_params
      params.require(:message).permit(:content, :chat_id, :user_id)
    end
  end
end
module Api::V1
  class MessagesController < ApiController
    def create
      message = Message.new(message_params)
      users = ChatUser.where(chat_id: message_params[:chat_id])
      if message.save
        @message = Message.joins(:user).where(id: message.id).pluck(:id, :name, :content, :created_at, :chat_id, :avatar)
        # serialized_message = ActiveModelSerializers::Adapter::Json.new(
        #   MessageSerializer.new(message)
        #   ).serializable_hash
          users.each do |user|
            ActionCable.server.broadcast("message_user#{user.user_id}", @message)
          end
            puts "MESSAGE BROAD!"
      end
    end

    def index
      #[0] message id, [1]sender name, [2] content, [3]date [4]chatid [5]avatar
      @messages = Message.joins(:user).where(chat_id: params[:chat]).order(:created_at).pluck(:id, :name, :content, :created_at, :chat_id, :avatar)

      render json: @messages
    end
    private
    
    def message_params
      params.require(:message).permit(:content, :chat_id, :user_id)
    end
  end
end
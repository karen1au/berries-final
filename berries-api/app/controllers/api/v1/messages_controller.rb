module Api::V1
  class MessagesController < ApiController
    def create
      message = Message.new(message_params)
      users = ChatUser.where(chat_id: params[:chat_id])
      if message.save
        serialized_message = ActiveModelSerializers::Adapter::Json.new(
          MessageSerializer.new(message)
          ).serializable_hash
          users.each do |user|
          notification = Notification.new(sender_id: params[:user_id], receiver_id: user.user_id, noti_type: "new message")
          if notification.save
            serialized_noti = ActiveModelSerializers::Adapter::Json.new(
            NotificationSerializer.new(notification)
            ).serializable_hash
        # allNoti = user.received_notifications.joins(:sender).pluck(:id, :email, :noti_type, :sender_id)

            ActionCable.server.broadcast("current_user_#{params[user.user_id]}", serialized_noti)
            ActionCable.server.broadcast("message_user#{user.user_id}", serialized_message)
            puts "MESSAGE BROAD!"
            end
          end
      end
    end

    def index
      #[0] message id, [1]sender name, [2] content, [3]date [4]chatid
      @messages = Message.joins(:user).where(chat_id: params[:chat]).pluck(:id, :name, :content, :created_at, :chat_id)

      render json: @messages
    end
    private
    
    def message_params
      params.require(:message).permit(:content, :chat_id, :user_id)
    end
  end
end
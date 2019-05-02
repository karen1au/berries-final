module Api::V1
  class NotificationsController < ApplicationController
    def create
      notification = Notification.new(sender_id: params[:sender], receiver_id: params[:receiver], noti_type: params[:noti_type])
      if notification.save
        serialized_data = ActiveModelSerializers::Adapter::Json.new(
          NotificationSerializer.new(notification)
        ).serializable_hash
        ActionCable.server.broadcast("current_user_#{params[:receiver]}", serialized_data)
        
      end
      create_relationship
      create_chat
    end
    private
    
    def notification_params
      params.require(:notification).permit(:noti_type, :sender, :receiver)
    end

    def create_relationship
      user1 = params[:sender]
      user2 = params[:receiver]
      relationship = Relationship.new(user1_id: user1, user2_id: user2)
      if relationship.save
        puts 'relationship created!'
      else
        puts 'relationship not created :('
      end
    end

    def create_chat
      sender = params[:sender]
      chat = Chat.new(creator_id: sender)
      if chat.save
      user_chat = ChatUser.new(chat_id: chat.id, user_id: sender)
      user_chat.save
      end
    end
  end
end
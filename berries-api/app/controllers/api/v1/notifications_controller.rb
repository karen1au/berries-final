module Api::V1
  class NotificationsController < ApplicationController
    def create
      notification = Notification.new(sender_id: params[:sender], receiver_id: params[:receiver], noti_type: params[:noti_type])
      if notification.save
        user = User.find(params[:receiver])
        allNoti = user.received_notifications.joins(:sender).pluck(:id, :email, :noti_type)
        # serialized_data = ActiveModelSerializers::Adapter::Json.new(
        #   NotificationSerializer.new(notification)
        # ).serializable_hash
        ActionCable.server.broadcast("current_user_#{params[:receiver]}", allNoti)
        
      end
      # create_relationship
      # create_chat
    end

    def index
      user = User.find(params[:user])
      #[0] is notification id, [1] is sender email, [2] is noti_type [3] is senderID
      @notifications = user.received_notifications.joins(:sender).pluck(:id, :email, :noti_type, :sender_id)
      render json: @notifications
    end

    def destroy
      @notification = Notification.find(params[:id])
      @relationship = Relationship.where(user1_id: @notification.sender_id, user2_id: @notification.receiver_id)
        .or(Relationship.where(user2_id: @notification.sender_id, user1_id: @notification.receiver_id)).destroy_all
      @notification.destroy
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
module Api::V1
  class NotificationsController < ApplicationController
    def create
      notification = Notification.new(sender_id: params[:sender], receiver_id: params[:receiver], noti_type: params[:noti_type])
      if notification.save
        user = User.find(params[:receiver])
        allNoti = user.received_notifications.joins(:sender).pluck(:id, :email, :noti_type, :sender_id)
        # serialized_data = ActiveModelSerializers::Adapter::Json.new(
        #   NotificationSerializer.new(notification)
        # ).serializable_hash
        ActionCable.server.broadcast("current_user_#{params[:receiver]}", allNoti)
        
      end
    end

    def index
      user = User.find(params[:user])
      #[0] is notification id, [1] is sender email, [2] is noti_type [3] is senderID
      @notifications = user.received_notifications.joins(:sender).order(:created_at).pluck(:id, :email, :noti_type, :sender_id)
      render json: @notifications
    end

    def destroy
      @notification = Notification.find(params[:id])
      # @relationship = Relationship.where(user1_id: @notification.sender_id, user2_id: @notification.receiver_id)
      #   .or(Relationship.where(user2_id: @notification.sender_id, user1_id: @notification.receiver_id)).destroy_all
      @notification.destroy
    end
    private
    
    def notification_params
      params.require(:notification).permit(:noti_type, :sender, :receiver)
    end

  end
end
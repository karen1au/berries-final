module Api::V1
  class NotificationsController < ApplicationController
    def create
      if params[:chat].present?
        chat_users = ChatUser.where("chat_id = ? AND user_id != ?", params[:chat], params[:sender])
        chat_users.each do |user|
          @user = user
          notification = Notification.new(sender_id: params[:sender], receiver_id: @user.user_id, noti_type: params[:noti_type])
          if notification.save
            target_user = User.find(@user.user_id)
            allNoti = target_user.received_notifications.joins(:sender).where(id: notification.id).pluck(:id, :email, :noti_type, :sender_id)
            ActionCable.server.broadcast("current_user_#{target_user.id}", allNoti)
          end
        end
      end

      if params[:receiver].present?
        notification = Notification.new(sender_id: params[:sender], receiver_id: params[:receiver], noti_type: params[:noti_type])
        if notification.save
          user = User.find(params[:receiver])
          allNoti = user.received_notifications.joins(:sender).where(id: notification.id).pluck(:id, :email, :noti_type, :sender_id)
        # serialized_data = ActiveModelSerializers::Adapter::Json.new(
        #   NotificationSerializer.new(notification)
        # ).serializable_hash
          ActionCable.server.broadcast("current_user_#{params[:receiver]}", allNoti)
        end
      end
    end

    def index
      user = User.find(params[:user])
      #[0] is notification id, [1] is sender email, [2] is noti_type [3] is senderID
      @notifications = user.received_notifications.joins(:sender).order(:created_at).pluck(:id, :email, :noti_type, :sender_id)
      # render json: @notifications.map do |n|
      #   {
      #     id: n[0],
      #     senderEmail: n[1],
      #     type: n[2],
      #     senderId: n[3]
      #   }
      # end
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
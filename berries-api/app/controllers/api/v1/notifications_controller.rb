module Api::V1
  class NotificationsController < ApplicationController
    def create
      @notification = Notification.new(noti_params)
      if @notification.save
        puts "notification created!"
        render json: { @notification }
      else
        puts @notification.errors.full_messages
      end
    end

    private

    def noti_params
      params.require(:notification).permit(
        :sender_id,
        :receiver_id,
        :type
      )
    end
  end
end
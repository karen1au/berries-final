class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "current_user_#{params[:current_user]}"
  end

  # def received(data)
  #   NotificationsChannel.broadcast_to(current_user, data)
  # end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

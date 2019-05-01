class NotificationChannel < ApplicationCable::Channel
  def subscribed
    byebug
    @notification = params[:notification]
    @receiver = @notification.receiver_id
    stream_for current_user
  end

  def received(data)
    notification = Notification.create(sender_id: data["sender_id"], receiver_id: data["receiver_id"], type: data["type"])
    NotificationChannel.broadcast_to(@receiver, @notification)
  end

  def jam_request
    NotificationChannel.broadcast_to(@receiver, {notification: 'jam request', sender: current_user})
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

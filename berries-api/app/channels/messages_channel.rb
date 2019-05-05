class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "message_user#{params[:current]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

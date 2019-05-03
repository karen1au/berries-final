class ChatsChannel < ApplicationCable::Channel
  def subscribed
    user = Chat_user.where(id: params[:chat])
    stream_from "chat_channel_user_#{user.id}"

    end
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

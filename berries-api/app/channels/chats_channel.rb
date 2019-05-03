class ChatsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chats_user_#{params[:current_user]}"
  end


  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

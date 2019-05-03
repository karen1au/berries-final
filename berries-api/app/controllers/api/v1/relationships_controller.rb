module Api::V1
  class RelationshipsController < ApiController
    # def index
    #   chats = Chat.all
    #   render json: chats
    # end

    def create
      @relationship = Relationship.new(user1_id: params[:user1_id], user2_id: params[:user2_id])
      if @relationship.save
        @chat = Chat.new(creator_id: params[:user1_id])
        if @chat.save
          ChatUser.new(chat_id: @chat.id, user_id: params[:user1_id])
          ChatUser.new(chat_id: @chat.id, user_id: params[:user2_id])
          Notification.where(sender_id: params[:user2_id], receiver_id: params[:user1_id]).destroy_all
  
          puts "everything created!"

        end
      end
    end

    private
  
    # def noti_params
    #   params.require(:relationship).permit(:sender, :receiver, :type)
    # end
  end
end
module Api::V1
  class RelationshipsController < ApiController

    def create
      @relationship = Relationship.new(user1_id: params[:user1_id], user2_id: params[:user2_id])
      if @relationship.save
        @chat = Chat.new(creator_id: params[:user1_id])
        if @chat.save
          @user1 = ChatUser.new(chat_id: @chat.id, user_id: params[:user1_id])
          @user2 = ChatUser.new(chat_id: @chat.id, user_id: params[:user2_id])
          if @user1.save && @user2.save
          Notification.where(sender_id: params[:user2_id], receiver_id: params[:user1_id]).destroy_all
          end
          puts "everything created!"

        end
      end
    end

  end
end
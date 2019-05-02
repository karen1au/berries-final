module Api::V1
  class RelationshipsController < ApiController
    # def index
    #   chats = Chat.all
    #   render json: chats
    # end

    def create
      relationship = Relationship.new(relationship_params)
      if chat.save
        serialized_data = ActiveModelSerializers::Adapter::Json.new(
        ChatSerializer.new(chat)
      ).serializable_hash
      ActionCable.server.broadcast 'chats_channel', serialized_data
      head :ok
      end
    end

    private
  
    def noti_params
      params.require(:notification).permit(:sender, :receiver, :type)
    end
  end
end
class ChatSerializer < ActiveModel::Serializer
  attributes :id, :creator_id
  # has_many :chat_users
  # has_many :messages
end

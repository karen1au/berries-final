class ChatSerializer < ActiveModel::Serializer
  attributes :id
  has_many :chat_users
  has_many :messages
end

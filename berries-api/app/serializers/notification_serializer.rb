class NotificationSerializer < ActiveModel::Serializer
  attributes :id, :noti_type, :sender_id, :receiver_id
end

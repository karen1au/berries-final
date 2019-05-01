class NotificationSerializer < ActiveModel::Serializer
  attributes :id, :type, :sender, :receiver
end

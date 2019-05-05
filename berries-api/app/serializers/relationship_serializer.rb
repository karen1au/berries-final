class RelationshipSerializer < ActiveModel::Serializer
  attributes :id, :user1_id, :user2_id
end

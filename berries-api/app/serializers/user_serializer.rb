class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :avatar, :band, :location, :commitment, :created_at, :soundcloud, :youtube
end
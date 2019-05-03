class Chat < ApplicationRecord
  has_many :chat_users, dependent: :destroy
  has_many :messages, dependent: :destroy
  belongs_to :creator, :foreign_key => :creator_id, :class_name => 'User'

  validates :creator, presence: true
end

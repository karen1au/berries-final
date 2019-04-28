class User < ApplicationRecord
  has_secure_password
  has_many :user_exps, dependent: :destroy
  has_many :user_genres, dependent: :destroy
  has_many :chat_users, dependent: :destroy
  has_many :messages, dependent: :destroy
  has_many :connections, dependent: :destroy

  validates :name, presence: true
  validates :password, length: { minimum: 7 }
  validates :email, uniqueness: { case_sensitive: false }
  validates :location, presence: true
  validates :commitment, presence: true

  #before_save { |user| user.email = user.email.downcase! }
end

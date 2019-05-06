class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # devise :database_authenticatable, :registerable,
  #       :recoverable, :rememberable, :validatable
  has_secure_password
  has_secure_token :auth_token
  has_many :user_exps, dependent: :destroy
  has_many :user_genres, dependent: :destroy
  has_many :chat_users, dependent: :destroy
  has_many :messages, dependent: :destroy
  has_many :relationship, dependent: :destroy
  has_many :chats, dependent: :destroy
  has_many :sent_notifications, class_name: "Notification", foreign_key: :sender_id
  has_many :received_notifications, class_name: "Notification", foreign_key: :receiver_id

  # validates :name, presence: true  
  # validates :band, presence: true
  # validates :password, length: { minimum: 7 }
  validates :email, uniqueness: { case_sensitive: false }, presence: true
  # validates :location, presence: true
  # validates :commitment, presence: true

  acts_as_mappable  :default_units => :miles,
  :default_formula => :sphere,
  :distance_field_name => :distance,
  :lat_column_name => :lat,
  :lng_column_name => :lng

  before_save { |user| user.email.downcase! }

  def invalidate_token
    self.update_columns(auth_token: nil)
  end

  def self.validate_login(email, password)
    user = find_by(email: email)
    if user && user.authenticate(password)
      user
    end

  end
end

class Genre < ApplicationRecord
  has_many :user_genres

  validates :name, presence: true
end

class Instrument < ApplicationRecord
  has_many :user_exps

  validates :name, presence: true

end

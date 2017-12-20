class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :user_search_histories

  attr_accessor :csrf_token

  def as_json(options = nil)
    json_model = super(options)
    json_model[:csrf_token] = csrf_token
    json_model
  end
end

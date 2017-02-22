class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, presence: true
validates :username, uniqueness: true
validates :username, format: {with: /\A[a-zA-Z_\d]+\z/, message: "Letters,
  numbers, and underscore ('_') only allowed characters"}
validates :session_token, uniqueness: true
validates :password, length: { minimum: 6, allow_nil: true }

after_initialize :ensure_session_token

attr_reader :password

has_many :ratings, dependent: :destroy

has_many :rated_films, through: :ratings, source: :film

def self.find_by_credentials(username, password)
  user = User.find_by_username(username)
  return nil unless user
  return user if user.is_password?(password)
  nil
end

def self.generate_session_token
  SecureRandom.urlsafe_base64
end

def reset_session_token!
  self.session_token = User.generate_session_token
end

def ensure_session_token
  self.reset_session_token! unless self.session_token
end

def password=(password)
  @password = password
  self.password_digest = BCrypt::Password.create(password)
end

def is_password?(password)
  BCrypt::Password.new(self.password_digest).is_password?(password)
end
end

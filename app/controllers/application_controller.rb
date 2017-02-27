class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception

  before_action :set_errors

  helper_method :current_user

  def login!(user)
    user.reset_session_token!
    user.save!
    session[:session_token] = user.session_token
  end

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def logout!
    if current_user
      @current_user.reset_session_token!
      @current_user.save
      @errors += @current_user.errors.full_messages
    end
    @current_user = nil
    session[:session_token] = nil
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end

  def set_errors
    @errors = []
  end
end

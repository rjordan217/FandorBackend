class Api::UserController < ApplicationController
  before_action :verify_login, only: [:show, :destroy]

  def create
    @user = User.new(user_params)
    login!(@user) if @user.save
    @errors += @user.errors.full_messages
    render :show
  end

  def show
    render :show
  end

  def destroy
    @user = current_user
    logout! unless @user.nil?
    @user = User.new
    render :show
  end

  private
  def verify_login
    @user = current_user || User.new
  end
end

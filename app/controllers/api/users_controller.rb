class Api::UsersController < ApplicationController
  before_action :verify_login, only: [:show, :destroy]

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
    else
      @errors += @user.errors.full_messages
      @user = User.new
    end
    render :show
  end

  def show
    render :show
  end

  def destroy
    errs = []
    unless @user.nil?
      @user.destroy
      errs = @user.errors.full_messages
      logout! unless errs.empty?
    end
    @user = User.new
    @errors += errs
    render :show
  end

  private
  def verify_login
    @user = current_user || User.new
  end
end

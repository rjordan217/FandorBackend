class Api::SessionsController < ApplicationController
    def create
      @user = User.find_by_credentials(user_params[:username], user_params[:password])
      if @user
        login!(@user)
        render '/api/users/show'
      else
        @user = User.new
        @errors = ["Incorrect username/password combination. Please try again."]
        render '/api/users/show'
      end
    end

    def destroy
      logout!
      @user = User.new
      render '/api/users/show'
    end
end

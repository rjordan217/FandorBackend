class Api::RatingsController < ApplicationController
  before_action :ensure_logged_in

  def create
    @rating = Rating.new(ratings_params.merge(user_id: current_user.id))
    @rating.save
    unless @rating.errors.full_messages.empty?
      @errors += @rating.errors.full_messages
      @rating = nil
    end
    render :show
  end

  def destroy
    @rating = Rating.find(params[:id])
    @rating.destroy if @rating && (current_user.id == @rating.user_id)
    render :show
  end

  private
  def ratings_params
    params.require(:rating).permit(:film_id, :value)
  end

  def ensure_logged_in
    if current_user.nil?
      flash[:errors] = ["Must be logged in to make or delete item requests."]
      redirect_to '/'
    end
  end
end

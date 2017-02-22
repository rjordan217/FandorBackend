class Api::RatingsController < ApplicationController
  before_action :ensure_logged_in

  def create
    @rating = Rating.new(ratings_params.merge(user_id: current_user.id))
    @rating.save
    @rating = nil unless @rating.errors.full_messages.empty?
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
end

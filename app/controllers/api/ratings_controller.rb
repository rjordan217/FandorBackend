class Api::RatingsController < ApplicationController
  before_action :ensure_logged_in

  def create
    if @errors.empty?
      @rating = Rating.new(ratings_params.merge(user_id: current_user.id))
      @rating.save
      unless @rating.errors.full_messages.empty?
        @errors += @rating.errors.full_messages
        @rating = Rating.new
      end
    else
      @rating = Rating.new
    end
    render :show
  end

  def destroy
    unless @errors.empty?
      @rating = Rating.find(params[:id])
      @rating.destroy if @rating && (current_user.id == @rating.user_id)
      @errors += @rating.errors.full_messages
    end
    @rating = Rating.new
    render :show
  end

  private
  def ratings_params
    params.require(:rating).permit(:film_id, :value)
  end

  def ensure_logged_in
    if current_user.nil?
      @errors += ["Must be logged in properly to edit ratings."]
    end
  end
end

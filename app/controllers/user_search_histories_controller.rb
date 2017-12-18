class UserSearchHistoriesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: current_user.user_search_histories
  end

  def create
    render json: current_user.user_search_histories.create(search: search_history_params[:bl_id])
  end

  def destroy
    render json: current_user.user_search_histories.delete(params[:id])
  end

  def destroy_all
    render json: current_user.user_search_histories.destroy_all
  end

  private

  def search_history_params
    params.require(:user_search_history).permit(:bl_id, :id)
  end
end

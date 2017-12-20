class SessionsController < Devise::SessionsController
  respond_to :json

  def create
    super do |user|
      user.csrf_token = form_authenticity_token
    end
  end

  def destroy
    sign_out
    render json: {
      'csrf_token' => form_authenticity_token
    }
  end
end

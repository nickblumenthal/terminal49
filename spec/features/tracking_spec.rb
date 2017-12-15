require 'rails_helper'

RSpec.describe 'Tracking a container' do
  it 'shows the user a form to search for containers' do
    visit '/'
    expect(page).to have_content('Search')
  end
end

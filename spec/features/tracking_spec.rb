require 'rails_helper'

RSpec.describe 'Tracking a container', js: true do
  it 'shows the user a form to search for containers' do
    visit '/'
    expect(page).to have_content('Search')
  end

  it 'allows the user to search for a container via the search form' do
    visit '/'
    within 'form.search' do
      fill_in '.search-bar', with: 'PABVTXG790195100'
      click_button 'Search'
    end

    expect(page).to have_content('B/L Number: TXG790195200')
  end
end

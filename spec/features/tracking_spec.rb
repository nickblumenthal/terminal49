require 'rails_helper'

# Specs always seem to take up the most time coding.  For the purposes of this exercise, I will write a few 'happy path'
# specs, but I'm going to ignore most edge causes for the sake of time.

RSpec.describe 'Tracking a container', js: true do
  it 'shows the user a form to search for containers' do
    visit '/'
    expect(page).to have_content('Search')
  end

  it 'allows the user to search for a container via the search form and then save it' do
    visit '/'
    expect(page).to have_css('input[name="bookingNumber"]')
    fill_in 'input[name="bookingNumber"]', visible: false, with: 'PABVTXG790195100'
    click_button 'Search'

    expect(page).to have_content('B/L Number: TXG790195200')

    click_button 'Save'
    expect(page).to have_content('Remove')
  end

  it 'allows the user to signup' do
    expect{
      visit '/'
      click_button 'Sign Up'
      expect(page).to have_content('Email')
      fill_in 'input[name="email"]', with: 'nick@gmail.com'
      fill_in 'input[name="password"]', with: 'nicknick'
      click_button 'Submit'
    }.to change{User.count}.by(1)
  end

  it 'allows the user to login' do
    User.create(email: 'nick@gmail.com', password: 'nicknick')
    visit '/'
    click_button 'Login'
    expect(page).to have_content('Email')
    fill_in 'input[name="email"]', with: 'nick@gmail.com'
    fill_in 'input[name="password"]', with: 'nicknick'
    click_button 'Submit'

    expect(page).to have_content('Search History')
  end
end

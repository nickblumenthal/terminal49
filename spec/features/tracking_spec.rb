require 'rails_helper'

# Specs always seem to take up the most time coding.  For the purposes of this exercise, I will write a few 'happy path'
# specs, but I'm going to ignore most edge causes for the sake of time.

RSpec.describe 'Tracking a container', js: true do
  context 'when logged out' do
    it 'shows the user a form to search for containers' do
      visit '/'
      expect(page).to have_content('Search')
    end

    it 'allows the user to search for a container via the search form' do
      visit '/'
      expect(page).to have_css('input[name="bookingNumber"]')
      fill_in 'bookingNumber', visible: false, with: 'TXG790195100'
      click_button 'Search'

      expect(page).to have_content('B/L Number TXG790195100')
    end

    it 'allows users to direct navigate to bookings' do
      visit '/bookings/TXG790195100'

      expect(page).to have_content('B/L Number TXG790195100')
    end

    it 'allows the user to signup' do
      expect{
        visit '/'
        click_button 'Sign Up'
        expect(page).to have_content('Email')
        fill_in 'email', with: 'nick@gmail.com'
        fill_in 'password', with: 'nicknick'
        click_button 'Submit'
        expect(page).to have_content('Logout')
      }.to change{User.count}.by(1)
    end

    it 'allows the user to login' do
      User.create(email: 'nick@gmail.com', password: 'nicknick')
      visit '/'
      click_button 'Login'
      expect(page).to have_content('Email')
      fill_in 'email', with: 'nick@gmail.com'
      fill_in 'password', with: 'nicknick'
      click_button 'Submit'

      expect(page).to have_content('Search History')
    end

    it 'prompts the user to sign in if they attempt to save a booking' do
      visit '/'

      fill_in 'bookingNumber', visible: false, with: 'TXG790195100'
      click_button 'Search'
      expect(page).to have_content('B/L Number TXG790195100')
      click_button 'Save'

      expect(page).to have_content('Please login')
    end
  end

  context 'when logged in' do
    it 'allows the user to save a booking' do
      User.create(email: 'nick@gmail.com', password: 'nicknick')
      visit '/bookings/TXG790195100'
      click_button 'Login'
      expect(page).to have_content('Email')
      fill_in 'email', with: 'nick@gmail.com'
      fill_in 'password', with: 'nicknick'
      click_button 'Submit'
      expect(page).to have_content('TXG790195100')

      click_button 'Save'
      expect(page).to have_content('Remove')
    end
  end
end

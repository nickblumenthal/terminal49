class CreateUserSearchHistory < ActiveRecord::Migration[5.1]
  def change
    create_table :user_search_histories do |t|
      t.belongs_to :users
      t.string :search
    end
  end
end

class RenameUserSearchHistories < ActiveRecord::Migration[5.1]
  def change
    rename_column :user_search_histories, :users_id, :user_id
  end
end

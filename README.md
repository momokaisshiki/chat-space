# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index: true|

### Association
- has_many :group_users
- has_many :groups, through: :group_users
- has_many :messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|

### Association
- has_many :group_users
- has_many :users, through: :group_users
- has_many :messages


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|　|
|image|string|  |
|user_id|references|foreign_key: true,null: fals|
|group_id|references|foreign_key: true,null: fals|

### Association
- belongs_to :user
- belongs_to :group

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

- belongs_to :group
- belongs_to :user


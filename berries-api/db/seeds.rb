# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

5.times do 
  User.create!(
    name: Faker::Music::RockBand.name,
    email: Faker::Internet.free_email,
    password: "12345678",
    avatar: Faker::Avatar.image,
    band: true,
    location: 'Markham',
    commitment: 'casual jam',
    soundcloud: 'hoodasaurus',
    lat: 43.8561,
    lng: -79.3370
  )
end

5.times do 
  User.create!(
    name: Faker::Music::RockBand.name,
    email: Faker::Internet.free_email,
    password: "12345678",
    avatar: Faker::Avatar.image,
    band: true,
    location: 'Toronto',
    commitment: 'casual jam',
    soundcloud: 'hoodasaurus',
    lat: 43.6543,
    lng: -79.3860
  )
end

5.times do 
  User.create!(
    name: Faker::Music::RockBand.name,
    email: Faker::Internet.free_email,
    password: "12345678",
    avatar: Faker::Avatar.image,
    band: true,
    location: 'Scarborough',
    commitment: 'ongoing jam',
    soundcloud: 'hoodasaurus',
    lat: 43.7764,
    lng: -79.2318
  )
end

5.times do 
  User.create!(
    name: Faker::Music::RockBand.name,
    email: Faker::Internet.free_email,
    password: "12345678",
    avatar: Faker::Avatar.image,
    band: true,
    location: 'Toronto',
    commitment: 'ongoing jam',
    soundcloud: 'hoodasaurus',
    lat: 43.6543,
    lng: -79.3860
  )
end

5.times do 
  User.create!(
    name: Faker::FunnyName.unique.name,
    email: Faker::Internet.free_email,
    password: "12345678",
    avatar: UiFaces.face,
    band: false,
    location: 'Etobicoke',
    description: 'Test description for Etobicoke',
    commitment: 'ongoing jam',
    youtube: 'SmartBooksMedia',
    lat: 43.6205,
    lng: -79.5132
  )
end

5.times do 
  User.create!(
    name: Faker::FunnyName.unique.name,
    email: Faker::Internet.free_email,
    password: "12345678",
    avatar: UiFaces.face,
    band: false,
    location: 'Toronto',
    description: 'Test description for Toronto',
    commitment: 'ongoing jam',
    youtube: 'SmartBooksMedia',
    lat: 43.6543,
    lng: -79.3860
  )
end

5.times do 
  User.create!(
    name: Faker::FunnyName.unique.name,
    email: Faker::Internet.free_email,
    password: "12345678",
    avatar: UiFaces.face,
    band: false,
    location: 'Mississauga',
    description: 'Test description for Mississauga',
    commitment: 'casual jam',
    youtube: 'SmartBooksMedia',
    lat: 43.5890,
    lng: -79.6441
  )
end

5.times do 
  User.create!(
    name: Faker::FunnyName.unique.name,
    email: Faker::Internet.free_email,
    password: "12345678",
    avatar: UiFaces.face,
    band: false,
    location: 'Toronto',
    description: 'Test description for Toronto',
    commitment: 'casual jam',
    youtube: 'SmartBooksMedia',
    lat: 43.6543,
    lng: -79.3860
  )
end

5.times do 
  User.create!(
    name: Faker::FunnyName.unique.name,
    email: Faker::Internet.free_email,
    password: "12345678",
    avatar: UiFaces.face,
    band: true,
    location: 'Etobicoke',
    description: 'Test description for Etobicoke',
    commitment: 'ongoing jam',
    youtube: 'SmartBooksMedia',
    lat: 43.6205,
    lng: -79.5132
  )
end

5.times do 
  User.create!(
    name: Faker::FunnyName.unique.name,
    email: Faker::Internet.free_email,
    password: "12345678",
    avatar: UiFaces.face,
    band: true,
    location: 'Toronto',
    description: 'Test description for Toronto',
    commitment: 'ongoing jam',
    youtube: 'SmartBooksMedia',
    lat: 43.6543,
    lng: -79.3860
  )
end

5.times do 
  User.create!(
    name: Faker::FunnyName.unique.name,
    email: Faker::Internet.free_email,
    password: "12345678",
    avatar: UiFaces.face,
    band: true,
    location: 'Mississauga',
    description: 'Test description for Mississauga',
    commitment: 'casual jam',
    youtube: 'SmartBooksMedia',
    lat: 43.5890,
    lng: -79.6441
  )
end

5.times do 
  User.create!(
    name: Faker::FunnyName.unique.name,
    email: Faker::Internet.free_email,
    password: "12345678",
    avatar: UiFaces.face,
    band: true,
    location: 'Toronto',
    description: 'Test description for Toronto',
    commitment: 'casual jam',
    youtube: 'SmartBooksMedia',
    lat: 43.6543,
    lng: -79.3860
  )
end

5.times do 
  User.create!(
    name: Faker::FunnyName.unique.name,
    email: Faker::Internet.free_email,
    password: Faker::Number.number(10),
    avatar: UiFaces.face,
    band: false,
    location: 'Montreal',
    description: 'Test description for Montreal',
    commitment: 'casual jam',
    youtube: 'SmartBooksMedia',
    lat: 45.5017,
    lng: -73.5673
  )
end

5.times do 
  User.create!(
    name: Faker::FunnyName.unique.name,
    email: Faker::Internet.free_email,
    password: Faker::Number.number(10),
    avatar: UiFaces.face,
    band: true,
    location: 'Montreal',
    description: 'Test description for Montreal',
    commitment: 'ongoing jam',
    youtube: 'SmartBooksMedia',
    lat: 45.5017,
    lng: -73.5673
  )
end

5.times do 
  User.create!(
    name: Faker::FunnyName.unique.name,
    email: Faker::Internet.free_email,
    password: Faker::Number.number(10),
    avatar: UiFaces.face,
    band: true,
    location: 'Montreal',
    description: 'Test description for Montreal',
    commitment: 'casual jam',
    youtube: 'SmartBooksMedia',
    lat: 45.5017,
    lng: -73.5673
  )
end

5.times do 
  User.create!(
    name: Faker::FunnyName.unique.name,
    email: Faker::Internet.free_email,
    password: Faker::Number.number(10),
    avatar: UiFaces.face,
    band: false,
    location: 'Montreal',
    description: 'Test description for Montreal',
    commitment: 'ongoing jam',
    youtube: 'SmartBooksMedia',
    lat: 45.5017,
    lng: -73.5673
  )
end

Instrument.create!(name: 'electric guitar')
Instrument.create!(name: 'drums')
Instrument.create!(name: 'percussion')
Instrument.create!(name: 'bass')
Instrument.create!(name: 'vocals')
Instrument.create!(name: 'acoustic guitar')
Instrument.create!(name: 'keyboard')
Instrument.create!(name: 'violin')
Instrument.create!(name: 'trumpet')
Instrument.create!(name: 'saxophone')
Instrument.create!(name: 'synthesizer')

Genre.create!(name: 'african')
Genre.create!(name: 'blues')
Genre.create!(name: 'classical')
Genre.create!(name: 'country')
Genre.create!(name: 'electronic')
Genre.create!(name: 'hip-hop')
Genre.create!(name: 'latin')
Genre.create!(name: 'pop')
Genre.create!(name: 'r&b')
Genre.create!(name: 'reggae')
Genre.create!(name: 'religious')
Genre.create!(name: 'rock')
Genre.create!(name: 'punk')
Genre.create!(name: 'metal')
Genre.create!(name: 'jazz')
Genre.create!(name: 'funk')
Genre.create!(name: 'soul')
Genre.create!(name: 'dance')

UserGenre.create!(genre_id: 1, user_id: 1)
UserGenre.create!(genre_id: 1, user_id: 2)
UserGenre.create!(genre_id: 2, user_id: 1)
UserGenre.create!(genre_id: 3, user_id: 3)
UserGenre.create!(genre_id: 4, user_id: 3)
UserGenre.create!(genre_id: 2, user_id: 4)
UserGenre.create!(genre_id: 5, user_id: 5)
UserGenre.create!(genre_id: 5, user_id: 6)

UserExp.create!(user_id: 1, instrument_id: 1, years: '0-2')
UserExp.create!(user_id: 2, instrument_id: 1, years: '0-2')
UserExp.create!(user_id: 1, instrument_id: 2, years: '2-4')
UserExp.create!(user_id: 3, instrument_id: 2, years: '2-4')

























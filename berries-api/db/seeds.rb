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
    password: Faker::Number.number(10),
    avatar: Faker::Avatar.image,
    band: true,
    location: Faker::Address.city,
    commitment: 'casual jam',
    soundcloud: 'hoodasaurus'
  )
end

5.times do 
  User.create!(
    name: Faker::FunnyName.unique.name,
    email: Faker::Internet.free_email,
    password: Faker::Number.number(10),
    avatar: Faker::Avatar.image,
    band: false,
    location: 'Toronto',
    commitment: 'ongoing jam',
    youtube: 'SmartBooksMedia'
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



















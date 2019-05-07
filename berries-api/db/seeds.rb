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
    name: Faker::Name.unique.name,
    email: Faker::Internet.free_email,
    password: "12345678",
    avatar: UiFaces.face,
    band: true,
    location: 'North York',
    commitment: 'casual jam',
    soundcloud: 'hoodasaurus',
    youtube: 'watch?v=U1tFH01cqj8',
    lat: 0.437615377e2,
    lng: -0.7941107939999999e2
  )
end

5.times do 
  User.create!(
    name: Faker::Name.unique.name,
    email: Faker::Internet.free_email,
    password: "12345678",
    avatar: UiFaces.face,
    band: true,
    location: 'Toronto',
    commitment: 'casual jam',
    soundcloud: 'hoodasaurus',
    youtube: 'watch?v=U1tFH01cqj8',
    lat: 0.43653226e2,
    lng: -0.793831843e2
  )
end

5.times do 
  User.create!(
    name: Faker::Name.unique.name,
    email: Faker::Internet.free_email,
    password: "12345678",
    avatar: UiFaces.face,
    band: true,
    location: 'Stouffville',
    commitment: 'formal jam',
    soundcloud: 'hoodasaurus',
    youtube: 'watch?v=U1tFH01cqj8',
    lat: 0.439705861e2,
    lng: -0.792442842e2
  )
end

5.times do 
  User.create!(
    name: Faker::Name.unique.name,
    email: Faker::Internet.free_email,
    password: "12345678",
    avatar: UiFaces.face,
    band: true,
    location: 'Oshawa',
    commitment: 'formal jam',
    soundcloud: 'hoodasaurus',
    youtube: 'watch?v=U1tFH01cqj8',
    lat: 0.438970929e2,
    lng: -0.7886579119999999e2
  )
end

5.times do 
  User.create!(
    name: Faker::Name.unique.name,
    email: Faker::Internet.free_email,
    password: "12345678",
    avatar: UiFaces.face,
    band: false,
    location: 'Etobicoke',
    description: 'Test description for Etobicoke',
    commitment: 'formal jam',
    soundcloud: 'hoodasaurus',
    youtube: 'watch?v=U1tFH01cqj8',
    lat: 0.436204946e2,
    lng: -0.795131983e2
  )
end

5.times do 
  User.create!(
    name: Faker::Name.unique.name,
    email: Faker::Internet.free_email,
    password: "12345678",
    avatar: UiFaces.face,
    band: false,
    location: 'Toronto',
    description: 'Test description for Toronto',
    commitment: 'formal jam',
    soundcloud: 'hoodasaurus',
    youtube: 'watch?v=U1tFH01cqj8',
    lat: 0.43653226e2,
    lng: -0.793831843e2
  )
end

5.times do 
  User.create!(
    name: Faker::Name.unique.name,
    email: Faker::Internet.free_email,
    password: "12345678",
    avatar: UiFaces.face,
    band: false,
    location: 'Mississauga',
    description: 'Test description for Mississauga',
    commitment: 'casual jam',
    soundcloud: 'hoodasaurus',
    youtube: 'watch?v=U1tFH01cqj8',
    lat: 0.435890452e2,
    lng: -0.796441198e2
  )
end

5.times do 
  User.create!(
    name: Faker::Name.unique.name,
    email: Faker::Internet.free_email,
    password: "12345678",
    avatar: UiFaces.face,
    band: false,
    location: 'Toronto',
    description: 'Test description for Toronto',
    commitment: 'casual jam',
    soundcloud: 'hoodasaurus',
    youtube: 'watch?v=U1tFH01cqj8',
    lat: 0.43653226e2,
    lng: -0.793831843e2
  )
end

5.times do 
  User.create!(
    name: Faker::Name.unique.name,
    email: Faker::Internet.free_email,
    password: "12345678",
    avatar: UiFaces.face,
    band: true,
    location: 'Etobicoke',
    description: 'Test description for Etobicoke',
    commitment: 'formal jam',
    soundcloud: 'hoodasaurus',
    youtube: 'watch?v=U1tFH01cqj8',
    lat: 0.436204946e2,
    lng: -0.795131983e2
  )
end

5.times do 
  User.create!(
    name: Faker::Name.unique.name,
    email: Faker::Internet.free_email,
    password: "12345678",
    avatar: UiFaces.face,
    band: true,
    location: 'Toronto',
    description: 'Test description for Toronto',
    commitment: 'formal jam',
    soundcloud: 'hoodasaurus',
    youtube: 'watch?v=U1tFH01cqj8',
    lat: 0.43653226e2,
    lng: -0.793831843e2
  )
end

5.times do 
  User.create!(
    name: Faker::Name.unique.name,
    email: Faker::Internet.free_email,
    password: "12345678",
    avatar: UiFaces.face,
    band: true,
    location: 'Mississauga',
    description: 'Test description for Mississauga',
    commitment: 'casual jam',
    soundcloud: 'hoodasaurus',
    youtube: 'watch?v=U1tFH01cqj8',
    lat: 0.435890452e2,
    lng: -0.796441198e2
  )
end

5.times do 
  User.create!(
    name: Faker::Name.unique.name,
    email: Faker::Internet.free_email,
    password: "12345678",
    avatar: UiFaces.face,
    band: true,
    location: 'Oshawa',
    description: 'Test description for Oshawa',
    commitment: 'casual jam',
    soundcloud: 'hoodasaurus',
    youtube: 'watch?v=U1tFH01cqj8',
    lat: 0.438970929e2,
    lng: -0.7886579119999999e2
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

200.times do
  UserGenre.create!(genre_id: rand(1..18), user_id: rand(1..60))
end

200.times do
  options = ['0-2', '2-4', '4-6', '6-8', '8-10', '10+']
  UserExp.create!(user_id: rand(1..60), instrument_id: rand(1..11), years: options.sample)
end

























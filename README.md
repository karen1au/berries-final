# Berries
Social networking app for musicians to "find your jam" built with React and Rails.

## What does it do?
!["signup"](https://github.com/tessthornley/berries-final/blob/master/berries-front/public/login.png?raw=true)
Sign up as a band or an individual to start finding your jam!

!["home"](https://github.com/tessthornley/berries-final/blob/master/berries-front/public/homepage.png?raw=true)
See a list of musicians sorting from closest to you by default. Connect by sending jam request to them.

!["profile-show"](https://github.com/tessthornley/berries-final/blob/master/berries-front/public/Profile_show.png?raw=true)
Checkout each musician's profile, including their soundcloud and youtube channel.

!["chat"](https://github.com/tessthornley/berries-final/blob/master/berries-front/public/chat.png?raw=true)
Start chatting and jamming, add more members as your jam grows!

!["profile-edit"](https://github.com/tessthornley/berries-final/blob/master/berries-front/public/Profile_edit.png?raw=true)
Edit your profile to get yourself more suitable match.

### Happy jamming!

## Setup

1. Fork & Clone
2. Run `bundle install` to install dependencies in front-end folder
3. Run `npm install` to install dependencies in back-end folder
5. Run `bin/rake db:reset` to create, load and seed db
6. Run `rails s` to start the server
7. Run `npm start` to start the front server

## Dependencies

### Front-end
* actioncable
* jquery
* react
* react-actioncable-provider
* react-cookies
* react-dom
* react-moment
* react-router-dom
* semantic-ui-react

### Back-end
* rails
* pg
* faker
* ui_faces
* bcrypt
* geokit-rails
* rack-cors

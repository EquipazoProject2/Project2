const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},
  (username, password, done) => {
    User.findOne({ username })
    .then(foundUser => {
      if (!foundUser) {
        done(null, false, { message: 'Incorrect username or password' });
        return;
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        done(null, false, { message: 'Incorrect username or password' });
        return;
      }

      if(foundUser.active==false){
        done(null, false, { message: 'Confirm your email' });
        return;
      }

        done(null, foundUser);
      })
      .catch(err => done(err));
  }
));

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {

      console.log(profile)
      User.findOne({ googleID: profile.id })
        .then((user) => {
          if (user) {
            done(null, user);
            return;
          }

          User.create({ googleID: profile.id, email: profile.emails[0].value, username: profile.displayName, photo: profile.photos[0].value })
            .then((newUser) => {
              done(null, newUser);
            })
            .catch(err => done(err));
        })
        .catch(err => done(err));
    },
  ),
);

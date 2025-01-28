const passport = require("passport");
const User = require("./mongodb");
const GoogleStrategy = require('passport-google-oauth20').Strategy

const GOOGLE_CLIENT_ID = "33430189365-r3o47kb2769or6oorvc2su444grq454e.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://fit-gracematsuoka.com/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    // Handle the user profile
    // console.log("Google Profile:", profile);
    try {
      // check if user already has an account
      let user = await User.findOne({ googleId: profile.id});

      if (!user) {
        user = await User.create({
          googleId: profile.id,
          name: profile.name.givenName,
          email: profile.emails[0].value,
          authType: "google"
        });
        return done(null, user);
      }
      else {
      return done(null, user);
      }
    }
    catch (err) {
      return done(err, null);
    }
  }
))

passport.serializeUser((user, done) => {
  done(null, user._id); // store data in session after user logs in
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user); // retrieves the user and passes to req object
  }
  catch (err) {
    done(err, null);
  }
})

module.exports = passport;
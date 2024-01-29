const passport=require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleOneTapStrategy =
  require("passport-google-one-tap").GoogleOneTapStrategy;

passport.serializeUser(function(user, done) {
 done(null, user);
});
passport.deserializeUser(function(user, done) {
 done(null, user);
});
passport.use(new GoogleStrategy({
    clientID: "321547850513-6e6ia32stia0j52a7vqg9q4osecim06p.apps.googleusercontent.com",
    clientSecret: "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",
 callbackURL: "http://localhost:3000/google/callback"
 },
 function(accessToken, refreshToken, profile, done) {
 return done(null, profile);
 }
));
passport.use(
    new GoogleOneTapStrategy(
      {
        clientID:
          "321547850513-i1bi159aohmit421at3g47bu1fvqfdv1.apps.googleusercontent.com", // your google client ID
        clientSecret: "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", // your google client secret
        verifyCsrfToken: false // whether to validate the csrf token or not
      },
      function (profile, done) {
        // Here your app code, for example:
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     return done(err, user);
        // });
        return done(null, profile);
      }
    )
  );
const passport=require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
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
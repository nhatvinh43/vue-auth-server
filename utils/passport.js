const passport = require('passport');
const localStrategy = require('passport-local');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {};
const jwt = require('jsonwebtoken');
const { addAccount, login } = require('../services/AccountServices');

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'hichic';


passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async (email, password, done) =>
    {
        try
        {
            const account = await addAccount({ email, password });
            if (!account)
            {
                return done(null, {}, "Error creating account");
            }
            const token = jwt.sign({ _id: account._id, email: account.email }, jwtOptions.secretOrKey);
            return done(null, token);
        } catch (e)
        {
            console.log(e);
            return done(e);
        }
    }))

passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) =>
{
    try
    {
        const account = await login({ email, password });
        if (!account)
        {
            return done(null, {}, "Invalid credentials");
        }
        const result = jwt.sign({ _id: account._id, email: account.email }, jwtOptions.secretOrKey)
        return done(null, result);
    } catch (e)
    {
        console.log(e);
        return done(e);
    }
}))

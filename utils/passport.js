const passport = require('passport');
const localStrategy = require('passport-local');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {};
const jwt = require('jsonwebtoken');
const { addAccount, login, getUser } = require('../routes/accounts/accounts.services');

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'hichic';


passport.use('register', new localStrategy({
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

passport.use('jwt', new JwtStrategy(jwtOptions, function (jwt_payload, next)
{
    const account = getUser({ _id: jwt_payload._id });
    if (user)
    {
        next(null, account);
    } else
    {
        next(null, false);
    }
}));
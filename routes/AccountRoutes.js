const passport = require('passport');
const router = require('express').Router();

router.post('/signup', (req, res, next) =>
{
    passport.authenticate('signup', { session: false }, (e, user, info) =>
    {
        if (e)
        {
            console.log(e);
            res.status(500).json({ message: "Error creating new user" });
        }
        if (info)
        {
            console.log(info);
            res.status(500).json({ message: info });
        }
        res.status(200).json(user);
    })(req, res, next);
});

router.post('/login', (req, res, next) =>
{
    passport.authenticate('login', { session: false }, (e, user, info) =>
    {
        if (e)
        {
            console.log(e);
            res.status(500).json({ message: "Error logging in" });
        }
        if (info)
        {
            console.log(info);
            res.status(500).json({ message: info });
        }
        res.status(200).json(user);
    })(req, res, next);
});


module.exports = { accountRouter: router };
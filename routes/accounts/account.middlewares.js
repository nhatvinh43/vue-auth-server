const { addAccount, login } = require('./accounts.services');

const addAccountMiddleware = async (req, res, next) =>
{
    const account = req.body;
    const result = await addAccount(account);
    if (result)
    {
        return res.status(200).json(result);
    }
    else return res.status(500).json({ message: 'Internal server error' });
}

const loginMiddleware = async (req, res, next) =>
{
    const account = req.body;
    const result = await login(account);
    if (result)
    {
        return res.status(200).json(result);
    }
    else return res.status(500).json({ message: 'Internal server error' });
}

module.exports = {
    addAccountMiddleware,
    loginMiddleware,
}
const { Account } = require('../models/Account');
const { encryptPassword, comparePassword } = require('../utils/encryption');

const addAccount = async (account) => {
    try {
        const encryptedPassword = encryptPassword(account.password);

        let temp = new Account({
            ...account,
        });

        temp.password = encryptedPassword;
        const addResult = await temp.save();
        return addResult;
    } catch (e) {
        console.log(e);
    }
}

const login = async ({ email, password }) => {
    try {
        const account = await Account.findOne({ email });
        if (account) {
            const compareResult = comparePassword(password, account.password);
            if (compareResult) {
                return account;
            } else return null;
        }
        return account;
    } catch (e) {
        console.log(e);
    }
}

module.exports = { addAccount, login };
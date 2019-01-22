const { hash } = require('../person/helper');
const AccountTable = require('../account/table');
const PersonTable = require('../person/table');

class RegisterAccount {
    static storeAccount( { accountName, username, password } ) {
        return new Promise((resolve, reject) => {
            const usernameHash = hash(username);
            const passwordHash = hash(password);
            RegisterAccount.isPersonExist({ usernameHash })
            .then(( { isExist } ) => {
                if (isExist) {
                    AccountTable.storeAccount( { accountName } )
                    .then(({ accountId }) => {
                        const isAdmin = true;
                        PersonTable.storePerson({ usernameHash, passwordHash, accountId, isAdmin })
                        .then(() => {
                            resolve()
                        })
                        .catch(e => reject(e));
                    })
                    .catch(e => reject(e));
                } else {
                    const error = new Error('Provided username already exist');
                    error.statusCode = 409;
                    reject(error);
                }
            });
        });
    }

    static isPersonExist({ usernameHash }) {
        return new Promise((resolve, reject) => {
            PersonTable.getPerson({ usernameHash })
            .then(({ person }) => resolve({ isExist: person == undefined }));
        })
        .catch(e => reject(e));
    }
}

module.exports = RegisterAccount;
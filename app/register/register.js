const { hash } = require('../person/helper');
const AccountTable = require('../account/table');
const PersonTable = require('../person/table');

class RegisterAccount {
    static storeAccount( { accountName, username, password } ) {
        return new Promise((resolve, reject) => {
            const usernameHash = hash(username);
            const passwordHash = hash(password);
            PersonTable.getPerson({ usernameHash })
            .then(( { person } ) => {
                if ( ! person ) {
                    AccountTable.storeAccount( { accountName } )
                    .then(( { accountId } ) => {
                        const isAdmin = true;
                        PersonTable.storePerson({ usernameHash, passwordHash, accountId, isAdmin })
                        .then(({ personId }) => {
                            resolve({ personId })
                        })
                        .catch(error => reject(error));
                    })
                    .catch(error => reject(error));
                } else {
                    const error = new Error('Provided username already exist');
                    error.statusCode = 409;
                    reject(error);
                }
            })
            .catch(error => reject(error));
        });
    }

    static isPersonExist({ usernameHash }) {
        return new Promise((resolve, reject) => {
            PersonTable.getPerson( { usernameHash } )
            .then(({ person }) => resolve({ isExist: person != undefined }))
            .catch(error => reject(error));
        })
    }
}

module.exports = RegisterAccount;
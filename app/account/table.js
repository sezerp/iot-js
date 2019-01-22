const pool = require("../../databasePool");


class AccountTable {
    static storeAccount({ accountName, address }) {
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO account("accountName", "address")
            VALUES($1, $2) RETURNING id`,
            [accountName, address],
            (error, response) => {
                if (error) return reject(error);
                const accountId = response.rows[0].id || {};
                resolve({ accountId });
            })
        }).catch(e => reject(error));
    }

    static getAccount({ accountId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT id, "accountName", address 
                FROM account
                WHERE id = $1`,
            [accountId],
            (error, response) => {
                if (error) return reject(error);

                const account = response.rows[0];
                resolve({ account });
            })
        });
    }
}

module.exports = AccountTable;
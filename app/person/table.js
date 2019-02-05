const pool = require('../../databasePool');

class PersonTable {
  static storePerson({ usernameHash, passwordHash, accountId, isAdmin }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO person("usernameHash", "passwordHash", "accountId", "isAdmin")
         VALUES($1, $2, $3, $4)`,
        [usernameHash, passwordHash, accountId, isAdmin],
        (error, response) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }

  static getPerson({ usernameHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT id, "passwordHash", "sessionId", "accountId" FROM person
         WHERE "usernameHash" = $1`,
        [usernameHash],
        (error, response) => {
          if (error) return reject(error);
          resolve({ person: response.rows[0] });
        }
      )
    });
  }

  static updateSessionId({ sessionId, usernameHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'UPDATE person SET "sessionId" = $1 WHERE "usernameHash" = $2',
        [sessionId, usernameHash],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      )
    });
  }
}

module.exports = PersonTable;
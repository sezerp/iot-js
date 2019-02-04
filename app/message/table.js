const pool = require('../../databasePool');

class Message {
    static storeMessage({ deviceId, message }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO message("deviceId", message)
                VALUES($1, $2) RETURNING id`,
                [deviceId, message],
                (error, response) => {
                    if (error) return reject(error);
                    const messageId = response.rows[0].id;
                    resolve({ messageId });
                }
            );
        });
    }

    static getAllMessages({ deviceId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT * 
                FROM message 
                WHERE "deviceId" = $1`,
                [deviceId],
                (error, response) => {
                    if (error) return reject(error);
                    resolve({messages: response.rows});
                }
            );
        });
    }
}

module.exports = Message;
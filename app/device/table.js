const pool = require('../../databasePool');

class Device {
    static storeDevice({ deviceName, isActive, accountId, templateId }) {
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO device("deviceName", "isActive", "accountId", "templateId")
            VALUES($1, $2, $3, $4) RETURNING id`,
            [deviceName, isActive, accountId, templateId],
            (error, response) => {
                if (error) reject(error);
                const deviceId = response.rows[0].id;
                resolve({ deviceId });
            })
        });
    }

    static getDevice({ deviceId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT * FROM device 
                WHERE "id" = $1`,
                [deviceId],
                (error, response) => {
                    if (error) return reject(error);
                    const device = response.rows[0];
                    resolve({ device });
                }
            );
        });
    }

    static getAllDevices({ accountId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT * FROM device WHERE "accountId" = $1 LIMIT 100`,
                [accountId],
                (error, response) => {
                    if ( error ) return reject( error);
                    resolve({ devices: response.rows });
                }
            )
        });
    }
}

module.exports = Device;
const pool = require('../../databasePool');

class Device {
    static storeDevice({ deviceName, personId, isActive, accountId, templateId }) {
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO device("deviceName", "isActive", "accountId", "templateId")
            VALUES($1, $2, $3, $4, $5) RETURNING id`,
            [deviceName, personId, isActive, accountId, templateId],
            (error, response) => {
                if (error) reject(error);
                const deviceId = response.rows[0].id;
                resolve({ deviceId });
            })
            .catch(err => reject(err));
        });
    }
}

module.exports = Device;
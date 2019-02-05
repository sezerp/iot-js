const pool = require('../../databasePool');


class Template {
    static storeTemplate({ rules, accountId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO template(rules, "accountId")
                values($1, $2) RETURNING id`,
                [ rules, accountId ],
                (error, response) => {
                    if (error) return reject(error);
                    const templateId = response.rows[0].id;
                    return resolve({ templateId });
                }
            );
        });
    }

    static getTemplate({ templateId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT * 
                FROM template 
                WHERE id = $1`,
                [templateId],
                (error, response) => {
                    if (error) return reject(error);
                    const template = response.rows[0];
                    resolve({ template });
                }
            )
        });
    }

    static getAllTemplates({ accountId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT * 
                FROM template
                WHERE "accountId" = $1
                LIMIT 100`,
                [accountId],
                (error, response) => {
                    if (error) return reject(error);
                    const templates = response.rows;
                    resolve({ templates });
                }
            );
        });
    }
}

module.exports = Template;
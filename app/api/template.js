const { Router } = require('express');
const { authenticated } = require('../api/helper');
const redisPool = require('../../redisPool');
const TemplateTable = require('../template/table');
const router = Router();

const TEMPLATE_ID_PREFIX = 'template'

router.get('/v1', (req, res, next) => {
    const sessionString = req.cookies.sessionString;
    authenticated({ sessionString })
    .then( ({ person }) => {
        const templateId = req.query.templateId;
        TemplateTable.getTemplate({ templateId })
        .then(({ template }) => res.json({ template }));
    })
    .catch(error => next(error));
});

router.get('/all/v1', (req, res, next) => {
    const sessionString = req.cookies.sessionString;
    authenticated({ sessionString })
    .then( ({ person }) => {
        const accountId =  person.accountId;
        TemplateTable.getAllTemplates({ accountId })
        .then(({ templates }) => res.json({ templates }));
    })
    .catch(error => next(error));
});

router.post('/v1', (req, res, next) => {
    const sessionString = req.cookies.sessionString;
    authenticated({ sessionString })
    .then( ({ person }) => {
        const { rules } = req.body;
        const accountId =  person.accountId;
        TemplateTable.storeTemplate({ rules, accountId })
        .then(({ templateId }) => {
            const id = `${TEMPLATE_ID_PREFIX}:${accountId}:${templateId}`;
            redisPool.set(id, rules);
            res.json({ templateId });
        });
    })
    .catch(error => next(error));
});

router.put('/v1', (req, res, next) => {

});

module.exports = router;
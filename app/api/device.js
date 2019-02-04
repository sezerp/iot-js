const { Router } = require('express');
const DeviceTable = require('../device/table');
const { authenticated } = require('../api/helper');
const redisPool = require('../../redisPool');
const MessageTable = require('../message/table');
const uuid = require('uuid');
const router = Router();

const MESSAGE_ID_PREFIX = 'device:message';


router.post('/v1', (req, res, next) => {
    const sessionString = req.cookies.sessionString;
    authenticated({ sessionString })
    .then( ({ person }) => {
        const { deviceName, isActive, templateId } = req.body;
        DeviceTable.storeDevice({ deviceName, isActive, accountId: person.accountId, templateId })
        .then(({ deviceId }) => {
            redisPool.set(deviceId, templateId);
            res.json({ deviceId });
        });
    })
    .catch(error => next(error));
});

router.get('/v1', (req, res, next) => {
    const sessionString = req.cookies.sessionString;
    authenticated({ sessionString })
    .then( ({ person }) => {
        const deviceId = req.query.deviceId;
        DeviceTable.getDevice({ deviceId })
        .then(({ device }) => {
            res.json({ device });
        });
    })
    .catch(error => next(error));
});

router.get('/all/v1', (req, res, next) => {
    const sessionString = req.cookies.sessionString;
    authenticated({ sessionString })
    .then( ({ person, authenticated }) => {
        const { accountId } = person;
        DeviceTable.getAllDevices({ accountId })
        .then(({ devices }) => {
            res.json({ devices });
        });
    })
    .catch(error => next(error));
});

router.put('/v1', (req, res, next) => {
    const sessionString = req.cookies.sessionString;
    authenticated({ sessionString })
    .then( ({ person }) => {
        const deviceId = req.query.deviceId;
        DeviceTable.getDevice({ deviceId })
        .then(({ device }) => {
            res.json({ device });
        });
    })
    .catch(error => next(error));
});

router.get('/message/read/v1', (req, res, next) => {
    const sessionString = req.cookies.sessionString;
    authenticated({ sessionString })
    .then( ({ person }) => {
        const deviceId = req.query.deviceId;
        const id = `${MESSAGE_ID_PREFIX}:${deviceId}`;
        redisPool.get(id, (err, reply) => {
            if (err) return next(err);
            res.json({ message: reply });
        });
    })
    .catch(error => next(error));
});

router.get('/message/read/all/v1', (req, res, next) => {
    const sessionString = req.cookies.sessionString;
    authenticated({ sessionString })
    .then( ({ person }) => {
        const deviceId = req.query.deviceId;
        MessageTable.getAllMessages({ deviceId })
        .then(({ messages }) => {
            res.json({ messages });
        })
    })
    .catch(error => next(error));
});

router.post('/message/send/v1', (req, res, next) => {
    const sessionString = req.cookies.sessionString;
    authenticated({ sessionString })
    .then( ({ person }) => {
        const { deviceId,  message} = req.body;
        const id = `${MESSAGE_ID_PREFIX}:${deviceId}`;
        redisPool.set(id, message);
        MessageTable.storeMessage({deviceId, message})
        .then(({ messageId }) => res.json({ messageId }))
        .catch(e => next(e));
    })
    .catch(error => next(error));
});

module.exports = router;
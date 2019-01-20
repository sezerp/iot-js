const { Router } = require('express');
const redisPool = require('../../redisPool');
const uuid = require('uuid');
const router = Router();


router.post('/message/read/v1', (req, res, next) => {
    const { messageId } = req.body;
    redisPool.get(messageId, (err, reply) => {
        res.json({ message: reply.toString() });
    })
});

router.post('/message/send/v1', (req, res, next) => {
    const { deviceId,  message} = req.body;
    const id = `device:${deviceId}`;
    redisPool.set(id, message);
    res.json({ messageId: 'done' });
});

// router.post('device/create')


module.exports = router;
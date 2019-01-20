const { Router } = require('express');
const redisPool = require('../../redisPool');
const uuid = require('uuid');
const router = Router();


router.post('/create/v1', (req, res, next) => {
    const { accountName, address } = req.body;

    res.json({ message: { accountName, address } });
});

router.post('/update/v1', (req, res, next) => {
    // const { accountName, address } = req.body;
    res.json({ "operation": 'done' });
});


module.exports = router;
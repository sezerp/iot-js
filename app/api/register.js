const { Router } = require('express');

const RegisterAccount = require('../register/register');

const router = Router();

router.post('/v1', (req, res, next) => {
    const { accountName, username, password } = req.body;
    RegisterAccount.storeAccount({ accountName, username, password })
    .then(() => {
        res.json({ isLogin: true });
    })
    .catch( e => next(e));
});

module.exports = router;
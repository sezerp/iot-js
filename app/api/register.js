const { Router } = require('express');
const { setSession } = require('./helper')

const RegisterAccount = require('../register/register');

const router = Router();

router.post('/v1', (req, res, next) => {
    const { accountName, username, password } = req.body;
    RegisterAccount.storeAccount({ accountName, username, password })
    .then((v) => {
        console.log(v);
        return setSession({ username, res })
    })
    .then(({ message }) => res.json({ message }))
    .catch( e => next(e));
});

module.exports = router;
const { Router } = require('express');
const PersonTable = require('../person/table'); 
const { hash } = require('../person/helper')
const { setSession, authenticated } = require('./helper')
const router = Router()


router.post('/v1', (req, res, next) => {
    const { username, password } = req.body;
    const usernameHash = hash( username )
    PersonTable.getPerson({ usernameHash })
    .then( ({ person }) => {
        if ( person && person.passwordHash === hash(password)) {
            return setSession( {  username, res } )
        } else {
            const error = new Error('Incorrect username/password');
            error.statusCode = 409;
            throw error;
        }
    })
    .then(( { message }) => res.json({ message }))
    .catch( e => next(e));
});

router.post('/authenticated/v1', (req, res, next) => {
    const sessionString = req.cookies.sessionString;
    authenticated({ sessionString })
    .then(({ authenticated  }) => res.json({ authenticated }))
    .catch(e => next(e));
});

module.exports = router;
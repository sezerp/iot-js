const { Router } = require('express');

const AccountTable = require('../account/table'); 

const router = Router()


// router.post('/v1', (req, res, next) => {
//     const { accountName, address } = req.body;
//     AccountTable.storeAccount({ accountName, address })
//     .then((id) => {
//         if (id) {
//             res.json( { id })
//         } else {
//             const error = new Error('Internal Server error');
//             error.statusCode = 500;
//             throw error;
//         }
//     })
//     .catch(e => next(e));
// });

// router.get('/v1', (req, res, next) => {
//     const { accountId } = req.body;
//     AccountTable.getAccount({ accountId })
//     .then((account) => {
//         if (account) {
//             res.json( { account })
//         } else {
//             const error = new Error('Not found any ');
//             error.statusCode = 404;
//             throw error;
//         }
//     })
//     .catch(e => next(e));
// });


module.exports = router;
const QAcontroller = require('../controllers/QA');


const router = require('express').Router();

router
    .post('/register',QAcontroller.Register)
    .post('/login', QAcontroller.Login)
    .post('/resetPassword', QAcontroller.ResetPassword)
    .put('/updatePassword', QAcontroller.UpdatePassword)


module.exports = router;
var express = require('express');
var router = express.Router();
var userService = require('../routes/services/user.service');
router.get('/', function(req, res, next) {
    res.render('signIn');
});
router.post('/signUp', userService.signUp);
router.post('/signIn', userService.signIn);

module.exports = router;
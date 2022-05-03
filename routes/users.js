var express = require('express');
var router = express.Router();

const userCntrl = require('../controller/userController');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


/* GET home page. */
router.get('/', userCntrl.startAddUsersJob);

module.exports = router;

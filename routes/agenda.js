var express = require('express');
var router = express.Router();
const agendaCntrl = require('../controller/agenda');
const agendaCntrlObj = new agendaCntrl();

/* GET home page. */
router.get('/', agendaCntrlObj.callDeleteOldUsers);
// router.get('/failed-jobs', agendaCntrlObj.callProcessFailedJobs);
  
module.exports = router;
  
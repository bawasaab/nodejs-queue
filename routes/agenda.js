var express = require('express');
var router = express.Router();
const agendaCntrl = require('../controller/agenda');
const agendaCntrlObj = new agendaCntrl();

/* GET home page. */
router.get('/', agendaCntrlObj.callDeleteOldUsers);
  
module.exports = router;
  
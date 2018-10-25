var express = require('express');
var router = express.Router();
const {add, login, getUser} = require('../controllers/users')
const {isLogin} = require('../middlewares/index')

router.post('/', add)
router.post('/login', login)
router.get('/', isLogin, getUser)

module.exports = router;

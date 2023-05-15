var express = require('express');
var router = express.Router();
const { login, register, current } = require('../controllers/users');
const { auth } = require('../middlewares/auth');

/* /api/user/login */
router.post('/login', login);

/* /api/user/register */
router.post('/register', register);

/* /api/user/current */
router.get('/current', auth, current);

module.exports = router;

var express = require('express');
var router = express.Router();
const { auth } = require('../middlewares/auth');
const { all, add, remove, edit, employee } = require( '../controllers/employees' );

/* /api/employees */
router.get('/', auth, all);

/* /api/employees/:id */
router.get('/:id', auth, employee);

/* /api/employees/add */
router.post('/add', auth, add);

/* /api/employees/remove */
router.post('/remove', auth, remove);

/* /api/employees/edit */
router.put('/edit', auth, edit);

module.exports = router;
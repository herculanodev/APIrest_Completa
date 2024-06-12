const express = require( 'express');
const router = express.Router();
const controller = require('../controller/users')

router.post('./', controller.criar);
router.post('./login' , controller.entrar )

module.exports = router;
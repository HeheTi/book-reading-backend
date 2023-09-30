const express = require('express');
const ctrl = require('../../controllers/auth');
const { schemas } = require('../../models/user');
const { validateBody, authenticate } = require('../../middlewares');

const router = express.Router();

router.post(
  '/registration',
  validateBody(schemas.registrationSchema),
  ctrl.registration
);
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);
router.post('/logout', () => {});
router.get('/current', () => {});

router.post('/refresh', validateBody(schemas.refreshSchema), ctrl.refresh);

module.exports = router;

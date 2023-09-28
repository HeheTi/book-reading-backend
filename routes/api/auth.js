const express = require('express');

const router = express.Router();

router.post('/registration', () => {});
router.post('/login', () => {});
router.post('/logout', () => {});
router.get('/current', () => {});

router.post('/refresh', () => {});

module.exports = router;

const express = require('express');
const {getContact, addContact, getList} = require('../controllers/newContactController');
const router = express.Router();

router.get('/getContact', getContact);

router.post('/addContact', addContact);

router.get('/getList',getList);

module.exports = router;
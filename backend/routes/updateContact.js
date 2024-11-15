const express = require('express');
const { updateContact, deleteContact } = require('../controllers/updateContactController');
const router = express.Router();

router.put('/updateContact/:id', updateContact);

router.delete('/deleteContact', deleteContact);

module.exports = router;
const Contact = require('../models/ContactModel');

const updateContact = async (req, res) => {
    try {
        const updatedData = {};
        for(let data in req.body){
            if(req.body[data] !== "") updatedData[data] = req.body[data];
        }
        const contacts = await Contact.findByIdAndUpdate( req.params.id,
            {$set: updatedData},
            {new: true});
        if(!contacts){
            res.status(500).json("No such contact found");
        }
        res.status(200).json("Updated successfully");
    } catch (error) {
        console.log(error.message)
        res.status(404).json({ message: error.message });
    }
}

const deleteContact = async (req, res) => {
    console.log(req.body);
    try {
        const contacts = req.body;
        const deletedContacts = await Contact.deleteMany({
            _id: {
                $in: contacts
            }
        });
        console.log("success");
        res.status(200);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = { updateContact, deleteContact };
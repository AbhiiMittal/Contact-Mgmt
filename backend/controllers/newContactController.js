const Contact = require('../models/ContactModel');

const getContact = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getList = async(req,res)=>{
    try{
        const company = new Set();
        const jobTitle = new Set();
        const contacts = await Contact.find();
        contacts.forEach(contact=>{
            if(contact.company){
                company.add(contact.company)
            }
            if(contact.jobTitle){
                jobTitle.add(contact.jobTitle)
            }
        })
        const result = {
            compList : Array.from(company),
            jobList : Array.from(jobTitle)
        }
        // console.log(result);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(409).json(err.message);
    }
}

const addContact = async (req, res) => {
    const contact = req.body;
    const number = await Contact.findOne({phoneNumber : contact.phoneNumber});
    const name = await Contact.findOne({firstName : contact.firstName, lastName : contact.lastName});
    if(number || name){
        return res.status(200).json("Contact already Exists");
    }
    const newContact = new Contact(contact);
    try {
        await newContact.save();
        res.status(200).json("Contact added successfully");
    } catch (error) {
        res.status(409).json(error.message);
    }
}

module.exports = { getContact, addContact, getList };
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const newContactRouter = require('./routes/newContact');
const updateContactRouter = require('./routes/updateContact');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.db)
.then(()=>console.log("Connected to Database"))
.catch(()=>console.log("Connection failed"));

app.use('/api',newContactRouter);
app.use('/api',updateContactRouter);


app.listen(process.env.PORT,()=>{
    console.log("Server is running on port 3000");
});
const express = require("express")
const passport = require("passport")
const cors = require("cors")
require('dotenv').config();
const mongoose = require("mongoose") 
const userRoutes = require("./routes/userRoutes")
const app = express();

const PORT = process.env.PORT || 5000;

//connect mongodb cloud
const uri = process.env.ATLAS_URI
mongoose.connect(uri,{   
    useNewUrlParser: true,
    useUnifiedTopology:true
})
const connection = mongoose.connection
connection.once('open',()=>{
    console.log("mongodb connected sucessfully");
})
connection.on('error',(err)=>{
    console.log(err);
})

//cors middleware
app.use(cors());

//parser middleware
app.use(express.json())

//passportjs middleware
app.use(passport.initialize())
app.use(passport.session())

require("./config/passport")(passport);

//user routes 
app.use("/user",userRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

require("dotenv").config()
// ------------------DB connection
const mongoose=require("mongoose")
const uri = 'mongodb+srv://rahuljraj:rahulzewss@cluster0.ovs73hh.mongodb.net/your_database_name_here?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Bind connection to open event (to know when we are connected)
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// ------------------requiring
const express=require("express")
const app=express()
const userRoutes=require("./routes/userRoutes")
const adminRoutes=require("./routes/adminRoutes")

// -----------view engine setting
app.use(express.static('asset'))  // -----css setting
app.set("view engine","ejs")

// -----middleware
app.use("/",userRoutes)
app.use("/admin",adminRoutes)

// ---------------port nummber
app.listen(process.env.PORT,()=>{

    console.log("server is running on 3000");
})

const express = require ("express");
const eventRoutes = require("./routes/event");
const cookieParser = require('cookie-parser');
const authRoutes = require("./routes/auth");
const dotenv = require('dotenv');
dotenv.config();
const cloudinary = require("cloudinary");
// var cors = require('cors')
const app = express();
//app.use(cors())
app.use(cookieParser());
app.use(express.json({
  limit: '50mb'
}));

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

app.use(express.static('build'));
app.use("/api/events",eventRoutes);
app.use("/api/auth",authRoutes);

app.listen(4000,() => {
    console.log("Connected at http://localhost:4000")
})
const express = require("express");
const app = express();
const DatabaseConnection = require("./database");
const dotenv = require("dotenv");
const colors = require("colors");
const bodyParser = require("body-parser");
const userRoute=require("./routes/userRoute");
const otpRoutes=require('./routes/otpRoute')
const cors=require('cors');
dotenv.config();
const port = process.env.PORT || 8000;

// Database Connection
DatabaseConnection();

//middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.post("/api/signup",register );
// app.post("/api/login",login)
app.use('/api',userRoute );
app.use('/api',otpRoutes)



app.listen(port, () => {
  console.log(`server listening at ${port}`.bgRed.white);
});

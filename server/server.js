const express = require("express");
const connectDB = require("./configs/db");
const bodyParser = require("body-parser");
const color = require("colors");
const passport = require("passport");

const app = express();

//=================>MiddleWare<==================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//=================>ConnectDB<===============
connectDB();
//=============>api<==================
app.use("/api/user", require("./routes/user"));
app.use("/api/profile", require("./routes/profile"));

//======>Passport Middleware<=============
app.use(passport.initialize());
// Passport config
require("./configs/passport");

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Runnig on port: ${port}`));

const express = require("express");
const connectDB = require("./configs/db");
const bodyParser = require("body-parser");
const color = require("colors");

const app = express();

//=================>MiddleWare<==================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//=============>api<==================
app.use("/api/user", require("./routes/user"));

//=================>ConnectDB<===============
connectDB();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Runnig on port: ${port}`));

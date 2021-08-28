const express = require("express");
const connectDB = require("./configs/db");
const color = require("colors");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

//=================>ConnectDB<===============
connectDB();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Runnig on port: ${port}`));

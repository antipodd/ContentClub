//Server Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");

const mongoose = require("mongoose");

//Articles
//const [NAME] = require("./models/[name]")

const app = express();
const PORT = process.env.PORT || 3000;

//logging and setting up bodyparser
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//using static public folder
app.use(express.static("./public"));


//Mongoose - Commented for now
// const databaseString = process.env.MONGODB_URI || "mongodb://localhost/ContentClub";

// mongoose.Promise = Promise;
// mongoose.connect(databaseString);
// const db = mongoose.connection;

// db.on("error", function(err) {
// 	console.log("Mongoose Error: ", err);
// });

// db.once("open", function() {
// 	console.log("Mongoose connection successful.");
// });

//Importing Routes
//const [name] = require("./controllers/[controller]");

//app.use("/", [name]);

//Initial Route, will be moved to controller file later
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, function() {
	console.log(`Server Running on Port: ${PORT}`);
});
const mongoose = require("mongoose");

// mongoose.connect("mongodb+srv://anshuman:sXuA.P2A-yhcD@j@cluster0.nxcwe.mongodb.net/assignmentdb?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// });


// const mongoAtlasUri =
//   "mongodb+srv://anshuman:na27nyJgS2QzBd0E@j@cluster0.nxcwe.mongodb.net/assignmentdb?retryWrites=true&w=majority";




const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://anshuman:j6eJFsQd4c7d7Tya@cluster0.nxcwe.mongodb.net/assignmentdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    uri,
    { useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true },
    () => console.log(" Mongoose is connected"),
  );
} catch (e) {
  console.log("could not connect");
}

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));
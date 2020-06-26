const express = require("express");
require("./Db/mongoose");
//main dashboard routers

const app = express();
const port = process.env.PORT;
var cors = require("cors");
app.use(cors());
app.use(express.json());

const hooks = require("./Controllers/dashboard/Router/index")

app.use(hooks);

app.listen(port, () => {
    console.log("Server isup on port " + port);
});

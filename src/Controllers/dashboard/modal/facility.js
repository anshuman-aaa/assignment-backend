const mongoose = require("mongoose");

const facilitySchema = new mongoose.Schema({},
    { strict: false }
);

facilitySchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    return userObject;
};
const facilityData = mongoose.model("Facility", facilitySchema);

module.exports = facilityData;

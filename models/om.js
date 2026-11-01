const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const omSchema = new Schema({
    name: String,
    marks: Number,
    email: String,
    image:{
        url: String,
        filename: String,

    },
   
});

const OM = mongoose.model("OM", omSchema);
module.exports = OM;


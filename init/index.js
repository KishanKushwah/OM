const mongoose = require("mongoose");
const initData = require("./data.js");
const OM = require("../models/om.js");

const MONGO_URL="mongodb://127.0.0.1:27017/OM";
main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
};

const initDB = async ()=>{
    await OM.deleteMany({});
    await OM.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();
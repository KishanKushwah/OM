
const express = require("express");
const router = express.Router();
const OM = require("../models/om.js");

module.exports.index = async(req, res) => {
     let { name } = req.query;
    console.log(name);
    let upcomingData = await OM.find({name:name});
    console.log(upcomingData);
    res.render("show.ejs", { upcomingData });
};    
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const OM = require("../models/om.js");
const omController = require("../controllers/oms.js");
const multer  = require('multer')
const { storage } =require("../cloudConfig.js");
const upload = multer({ storage });





//index route
// router.get("/", wrapAsync(omController.index));

router.post("/name", async(req,res)=>{
    let {name} = req.body;
    console.log(name);
    let upcomingData = await OM.find({name:name});
    console.log(upcomingData);
    req.flash("success", "New Request received");
    res.render("show.ejs", { upcomingData });
    
});
router.post("/name", upload.single('uploaded_file'), (req, res) => {
    res.send(req.file);
});

router.get("/", async(req, res)=>{
   try{
    let { name } = req.query;
    console.log(name);
    let upcomingData = await OM.find({name:name});
    console.log(upcomingData);
    res.render("show.ejs", { upcomingData });
    }catch(err){
    console.error(err);
    res.status(500).send("Error loading data");
   }
});


module.exports = router;
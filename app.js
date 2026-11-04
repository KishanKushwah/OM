 if(process.env.NODE_ENV != "production"){
     require('dotenv').config();
 }
 console.log(` ${process.env.SECRET}`);

const express = require ("express");
const app = express();
const path = require("path");
const mongoose =require("mongoose");
const OM = require("./models/om.js");
const ejsMate = require("ejs-Mate");
// const { NONAME } = require("dns");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const flash = require("connect-flash");
const multer  = require("multer");
const {storage} = require("./cloudConfig.js");
const oms = require("./routes/om.js");



const dbUrl = process.env.ATLASDB_URL;

main()
   .then(()=>{
    console.log("connected to the om");
   }).catch(err => {
    console.log("catch the err");
   });

async function main() {
  await mongoose.connect(dbUrl);

}

const upload = multer({ storage});



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "pubic")));
app.use(express.urlencoded({extended:true}));
app.engine('ejs', ejsMate);
app.use(express.json());

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
    store,
    secret:  process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly: true,
    },

};

// app.get("/", (req, res) => {
//     res.send("Hi, I am root");
// });






app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
   next();
});


app.use("/oms", oms);

// app.use((req,res, next)=>{
//     res.locals.success = req.flash("success");
//     res.locals.error= req.flash("error");
//     next();
// });

// app.get("/demouser", async(req, res)=>{
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "delta-student"
//     });
//      let registeredUser = await User.register(fakeUser, "helloworld");
//     res.send(registeredUser);
// });

app.use((err, req, res, next) => {
    let {status = 500, message = "Some Error Occured"} = err;
    res.status(status).send(message);
});



app.get("/hello", (req,res)=>{
    res.locals.successMsg = req.flash("success");
    res.render("page.ejs", {name:req.session.name});
});



app.post("/upload", upload.fields([{ name: "profileImage"}, { name: "coverImage"}]), (req, res)=>{
       console.log(req.body);
       console.log(req.file);

       return res.redirect("/oms");

});
app.listen(8080, ()=>{
        console.log("Server is listening at port 8080");
});
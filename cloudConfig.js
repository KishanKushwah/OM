const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage =  CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'OM_DEV',
    allowedFormats: ["png", "jpg", "jpeg", "pdf"]
   
  },
});

module.exports = {
    cloudinary,
    storage
};
 
// const parser = multer({ storage: storage });
 
// app.post('/upload', parser.single('image'), function (req, res) {
//   res.json(req.file);
// });


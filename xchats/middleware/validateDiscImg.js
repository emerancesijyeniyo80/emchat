const multer = require('multer');

var imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Please upload only images", false);
    }
};
//configuring multer of image upload
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + '/public/discimages/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-topic-${file.originalname}`);
  },
});

var uploadImg = multer({
    storage: storage,
    fileFilter: imageFilter
});
module.exports = uploadImg;
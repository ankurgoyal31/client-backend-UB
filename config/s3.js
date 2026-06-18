// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const AWS = require('aws-sdk');

// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_KEY,
//   region: process.env.AWS_REGION
// });  
 
// const s3 = new AWS.S3();
 
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_BUCKET_NAME,
//     acl: 'public-read',
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     key: function (req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname);
//     }
//   }),

//   // 🔥 VERY IMPORTANT
//   limits: {
//     fileSize: 100 * 1024 * 1024 // 100MB
//   },

//   // 🔥 MUST ADD
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype.startsWith("image/") ||
//       file.mimetype.startsWith("video/")
//     ) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only image/video allowed"), false);
//     }
//   }
// });

// module.exports = upload;







// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const AWS = require('aws-sdk');

// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_KEY,
//   region: process.env.AWS_REGION
// });  
 
// const s3 = new AWS.S3();
 
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_BUCKET_NAME,
//     acl: 'public-read',
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     key: function (req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname);
//     }
//   }),

//   // 🔥 VERY IMPORTANT
//   limits: {
//     fileSize: 100 * 1024 * 1024 // 100MB
//   },

//   // 🔥 MUST ADD
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype.startsWith("image/") ||
//       file.mimetype.startsWith("video/")
//     ) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only image/video allowed"), false);
//     }
//   }
// });

// module.exports = upload;





const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Upload folder
const uploadDir = path.join(__dirname, "../public/uploads");

// Folder automatically create ho jayega
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    const fileName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,

  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },

  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only image/video allowed"), false);
    }
  },
});

module.exports = upload;

const util = require("util");
const multer = require("multer");
const fs = require("fs");
const keys = require('../keys')
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + keys.UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const match = ["image/png", "image/jpeg", "image/jpg"];
    if (match.indexOf(file.mimetype) === -1) {
      var message = `${file.originalname} не допустимый файл. Принимаются только png/jpeg файлы.`;
      return cb(message, null);
    }
    cb(null, Date.now() + file.originalname);
  },
});

let upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
});

let uploadFile = util.promisify(upload.single("file"));
let uploadFiles = util.promisify(upload.array("files", 10))

async function deleteFile(file) {
  fs.stat(__basedir +file.path, function (err, stats) {
    if (err) {
      return console.error(err);
    }

    fs.unlink(__basedir +file.path, function (err) {
      if (err) return console.log(err);
      console.log("file deleted successfully");
    });
  });
}

module.exports = {
  uploadFile,
  uploadFiles,
  deleteFile
}

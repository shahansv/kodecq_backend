const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, callBack) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    callBack(null, true);
  } else {
    callBack(null, false);
  }
};

const multerMiddleware = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

module.exports = multerMiddleware;

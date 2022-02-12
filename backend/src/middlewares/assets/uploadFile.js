const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { nanoid } = require("nanoid");
// const upload = multer({ dest: "./public/data/uploads/" ,storage});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const requestPath = req.originalUrl.split("/")[2];
    const publicDir = path.join(__dirname, `../../../public`);
    const uploadsDir = path.join(publicDir, "/uploads");
    const fileDir = path.join(uploadsDir, `/${requestPath}`);
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
    if (!fs.existsSync(fileDir)) fs.mkdirSync(fileDir);

    cb(null, fileDir);
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split("/")[1];
    const sign = nanoid(3);
    const userID = req.user.id;
    const classroomID = req.params.classroomID;
    const fileName = `${classroomID}-${userID}-${sign}.${extension}`;

    cb(null, fileName);
  },
});

const upload = multer({ storage });

module.exports = upload;

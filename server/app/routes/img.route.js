import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";

let currDirname = dirname(fileURLToPath(import.meta.url));
currDirname = currDirname.slice(0, currDirname.lastIndexOf("\\"));
currDirname = currDirname.slice(0, currDirname.lastIndexOf("\\"));
const PUBLIC_DIR_NAME = path.resolve(currDirname, "public");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(PUBLIC_DIR_NAME, "images", "users"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + uuidv4() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

const api = express.Router();

api.post("/upload/users/", (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send({ fileName: req.file.filename });
  });
});

export default api;

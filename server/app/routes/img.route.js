import express from "express";
import busboy from "busboy";
import fs from "fs-extra";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const ALLOWED_IPS = ["127.0.0.1", "123.456.7.89"];

let currDirname = dirname(fileURLToPath(import.meta.url));
currDirname = currDirname.slice(0, currDirname.lastIndexOf("\\"));
currDirname = currDirname.slice(0, currDirname.lastIndexOf("\\"));
const PUBLIC_DIR_NAME = path.resolve(currDirname, "public");

const api = express.Router();

api.use(function (req, res, next) {
  if (ALLOWED_IPS.indexOf(req.ip) === -1) {
    res.status(401).send("Not authorized!");
  } else {
    next();
  }
});

api.post("/upload/users/", (req, res) => {
  let fstream;
  req.pipe(req.busboy);
  req.busboy.on("file", (fieldname, file, filename) => {
    console.log("Uploading: " + filename);
    const localFileName = uuidv4() + filename.slice(filename.lastIndexOf("."));
    fstream = fs.createWriteStream(
      path.resolve(PUBLIC_DIR_NAME, "images", "users", localFileName)
    );
    file.pipe(fstream);
    fstream.on("close", function () {
      console.log("Upload Finished");
      res.send({ fileName: localFileName });
    });
  });
});

export default api;

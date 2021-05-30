import express from "express";
import Busboy from "busboy";
import fs from "fs-extra";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import { v4 as uuidv4 } from "uuid";

let currDirname = dirname(fileURLToPath(import.meta.url));
currDirname = currDirname.slice(0, currDirname.lastIndexOf("\\"));
currDirname = currDirname.slice(0, currDirname.lastIndexOf("\\"));
const PUBLIC_DIR_NAME = path.resolve(currDirname, "public");

const api = express.Router();

api.post("/upload/users/", (req, res) => {
  const busboy = new Busboy({ headers: req.headers });
  let localFileName = "default.png";
  busboy.on("image", function (fieldname, file, filename, encoding, mimetype) {
    localFileName = uuidv4() + filename.slice(filename.lastIndexOf("."));
    const saveTo = path.resolve(
      PUBLIC_DIR_NAME,
      "images",
      "users",
      localFileName
    );

    console.log("Uploading: " + saveTo);
    file.pipe(fs.createWriteStream(saveTo));
  });

  busboy.on("finish", function () {
    console.log("Upload complete");
    res.status(200).send({ fileName: localFileName });
  });

  return req.pipe(busboy);
});

export default api;

const express = require("express");
var bodyParser = require("body-parser");
const router = express.Router();
const fileupload = require("express-fileupload");
var cors = require("cors");
var jsonParser = bodyParser.json();
const app = express();
app.use(fileupload());
app.use(express.static("files"));
router.post("/upload", cors(), jsonParser, async (req, res) => {
  console.log(req);
  // const newpath = __dirname + "/files/";
  // const file = req.files.file;
  // const filename = file.name;

  // file.mv(`${newpath}${filename}`, (err) => {
  //   if (err) {
  //     res.status(500).send({ message: "File upload failed", code: 200 });
  //   }
  //   res.status(200).send({ message: "File Uploaded", code: 200 });
  // });
});

module.exports = router;

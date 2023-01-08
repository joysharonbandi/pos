const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var WordPOS = require("wordpos"),
  wordpos = new WordPOS();

app.post("/upload", (req, res) => {
  const newpath = __dirname + "/files/";
  const file = req.files.file;
  const filename = file.name;
  // console.log(file.data.toString());
  console.log("hii");
  const string = file.data.toString();
  const st = string.trim();
  str = st.replace(/\n/g, " ");
  console.log(str.split(" ").length);
  const totalWords = str.split(" ").length;

  try {
    const data = wordpos
      .getPOS(str, (e) => {
        console.log("inside");
        console.log(e.nouns);
        const nouns = (e.nouns.length / totalWords) * 100;
        const verbs = (e.verbs.length / totalWords) * 100;
        const adjectives = (e.adjectives.length / totalWords) * 100;
        const adverbs = (e.adverbs.length / totalWords) * 100;
        const pos =
          e.nouns.length +
          e.verbs.length +
          e.adjectives.length +
          e.adverbs.length;
        const rest = ((totalWords - pos) / totalWords) * 100;
        const data = { nouns, adjectives, adverbs, rest, verbs };
        console.log(rest);
        res
          .status(200)
          .send({ message: "File Uploaded", code: 200, data: data });
      })
      .then((e) => {
        // console.log(e, "jjj");
      });
  } catch (e) {
    console.log("inside catch");
    console.log(e);
  }
  return 11;
  // file.mv()
  // file.mv(`${newpath}${filename}`, (err) => {
  //   if (err) {
  //     res.status(500).send({ message: "File upload failed", code: 200 });
  //   }
  //   res.status(200).send({ message: "File Uploaded", code: 200 });
  // });
});

app.listen(3000, () => {
  console.log("Server running successfully on 3000");
});

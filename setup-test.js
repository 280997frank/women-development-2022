const dotenv = require("dotenv");
const moduleAlias = require("module-alias");
const fs = require("fs");

const fileList = {};

fs.readdirSync("./assets/images/").forEach((file) => {
  fileList[`@/assets/images/${file}`] = __dirname + "/__mocks__/index.ts";
});

fs.readdirSync("./assets/images/pop/").forEach((file) => {
  fileList[`@/assets/images/pop/${file}`] = __dirname + "/__mocks__/index.ts";
});

moduleAlias.addAliases(fileList);

const firebaseLibList = {};

fs.readdirSync("./__mocks__/firebase/").forEach((file) => {
  firebaseLibList[`firebase/${file.replace(".ts", "")}`] =
    __dirname + "/__mocks__/firebase/" + file;
});

firebaseLibList["react-firehooks"] = __dirname + "/__mocks__/firehooks.ts";

moduleAlias.addAliases(firebaseLibList);

moduleAlias.addAlias("@", __dirname);

dotenv.config();

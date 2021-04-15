const generator = require("artan-ssg");
const path = require("path");
const fs = require("fs");

const promises = [];

generator.generate(
  "src",
  "dist",
  {
    sampleFilter: function (data) {
      return "nothing";
    },
  },
  {
    sample: function (data) {
      return "nothing";
    },
  },
  "debug"
);

Promise.all(promises)
  .then(() => {
    process.stdout.write("\rDone!\x1b[K\n");
  })
  .catch((err) => {
    console.error("Error processing files, let's clean it up", err);
  });

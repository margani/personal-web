const fs = require("fs");
const path = require("path");
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const rimraf = require("rimraf");
const slug = require("slug");

const targetFolder = "./src/samples";
const numberOfFolders = 5;
const numberOfPages = 7;
const numberOfSections = 10;
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const createDirectory = function (folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

rimraf.sync(targetFolder);
var pageSlugs = [];
for (var folderIndex = 0; folderIndex < numberOfFolders; folderIndex++) {
  const folderPath = path.join(targetFolder, slug(lorem.generateWords(2)));

  createDirectory(folderPath);

  for (var pageIndex = 0; pageIndex < numberOfPages; pageIndex++) {
    var pageSlug = "";
    do {
      pageSlug = slug(lorem.generateWords(3));
    } while (pageSlugs.indexOf(pageSlug) >= 0);

    pageSlugs.push(pageSlug);
    const filePath = path.join(folderPath, pageSlug + ".md");

    var pageContent = `---
title: ${lorem.generateSentences(1)}
layout: layout1
date: ${randomDate(new Date(2010, 0, 1), new Date(), 8, 20).toISOString()}
tags:
  - ${lorem.generateWords(1)}
  - ${lorem.generateWords(1)}
type: samples
---\n`;
    pageContent += `# ${lorem.generateSentences(1)}\n\n`;
    pageContent += lorem.generateParagraphs(2);
    for (
      var sectionIndex = 0;
      sectionIndex < numberOfSections;
      sectionIndex++
    ) {
      pageContent += `\n\n## ${lorem.generateSentences(1)}\n\n`;
      pageContent += lorem.generateParagraphs(3);
    }

    fs.writeFileSync(filePath, pageContent);
  }
}

function randomDate(start, end, startHour, endHour) {
  var date = new Date(+start + Math.random() * (end - start));
  var hour = (startHour + Math.random() * (endHour - startHour)) | 0;
  date.setHours(hour);
  return date;
}

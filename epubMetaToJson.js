const EPub = require('epub');
const fspath = require('fs-path');
const fs = require('fs');

fs.readdir('./testEpubs/', function(err, filenames) {
  if (err) return console.log('Error reading directory: ' + err);
  filenames.forEach(function(filename) {
    try {
      processEpub(filename);
    } catch (err) {
      console.log('Epub ' + filename + ' error: ' + err);
    }
  });
});

function processEpub(filename) {
  var targetEpubPath = './testEpubs/' + filename;
  var epub = new EPub(targetEpubPath);
  epub.on('end', function() {
    var fileNumber = filename.substr(0, filename.lastIndexOf('.'));
    var targetFilePath = './testEpubsData/' + fileNumber + '/index.json';
    saveToJsonFile(getMetadata(epub, targetEpubPath), targetFilePath);
  });
  epub.parse();
}

function getMetadata(epub, targetEpubPath) {
  return {
    'title': epub.metadata.title,
    'contributors': [epub.metadata.creator],
  };
}

function saveToJsonFile(metadata, path) {
  var content = JSON.stringify(metadata, null, 2);
  writeToFile(content, path);
}

function writeToFile(content, path) {
  fspath.writeFile(path, content, function(err) {
    if (err) console.log('File writing error for ' + path + ' with: ' + err);
    console.log('Data written to: ' + path);
  });
}

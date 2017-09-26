const EPub = require('epub');
const fspath = require('fs-path');
const fs = require('fs');
const targetDir = './testEpubs/';
const targetDataDir = './testEpubsData/';
const targetDataFile = '/index.json';

fs.readdir(targetDir, function(err, filenames) {
  if (err) return console.log('Error reading directory: ' + err);
  filenames.forEach(function(filename) {
    try {
      processEpub(filename);
    } catch (err) {
      console.err('Epub ' + filename + ' error: ' + err);
    }
  });
});

function processEpub(filename) {
  var targetEpubPath = targetDir + filename;
  var epub = new EPub(targetEpubPath);
  var fileNumber = filename.substr(0, filename.lastIndexOf('.'));
  var targetFilePath = targetDataDir + fileNumber + targetDataFile;
  epub.on('end', function() {
    saveToJsonFile(getMetadata(epub), targetFilePath)
      .catch(function(err) {
        console.err(err);
      });
  });
  epub.parse();
}

function getMetadata(epub) {
  return {
    'title': epub.metadata.title,
    'creator': epub.metadata.creator,
  };
}

function saveToJsonFile(metadataCallback, path) {
  var promise = new Promise( function(resolve, reject) {
    var content = JSON.stringify(metadataCallback, null, 2);
    writeToFile(content, path).then(function() {
      resolve();
    }).catch(function(err) {
      console.err(err);
      reject(err);
    });
  });
  return promise;
}

function writeToFile(content, path) {
  var promise = new Promise( function(resolve, reject) {
      fspath.writeFile(path, content, function(err) {
        if (err) reject('File writing error for ' + path + ' with: ' + err);
        console.log('Data written to: ' + path);
        resolve();
      });
    }
  );
  return promise;
}

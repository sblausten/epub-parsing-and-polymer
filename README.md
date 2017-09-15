## Bibliotech test

### To setup locally
```bash
git clone https://github.com/sblausten/epub-parsing-and-polymer.git
cd epub-parsing-and-polymer
npm i
```

#### To run script for extracting metadata from epub files
```bash
node epubMetaToJson.js
```

The script currently targets a directory testEpubs with 5 examples.

To add more epubs to parse please add them to this directory. 

#### To view Polymer form and test:
```bash
polymer serve
```
Navigate to localhost:8081 in browser.

### Issues encountered and progress with tasks

I couldn't find the 'contributors' field in the meta data accessible through the
suggested epub parsing utility so I used 'creator' instead.

I spent a while trying to extract the contributor field from the xml in
content.opf but ran out of time when dealing with unzipping the epub files and
parsing using an in memory buffer rather than writing the xml to a new file each
time using a stream.

I didn't get a chance to write tests.

All other tasks were completed.

### Requirements:
#### Task 1:
We have a large set of ePub files (over 1000) that need the
metainformation (title/author) extracted. Attached are the first 5 files as a
sample.

Use the ePub module to read in the attached 5 files, output the following meta
information template below (if present) as a JSON file called index.json in a
folder structure with the ePub name then index.json for example 1.epub would be
stored in /1/index.json

Meta Information template example:

{
  “title":"Horace: Odes and Epodes",
  "contributors":["Horace”]
}

#### Task 2:
Polymer Starter Kit (required)

Download the polymer starter kit.

Then can you then please add a login page to the starter kit (replace one of the
current views or add your own) with a form that contains An ‘email’ box which
takes a valid email A ‘password’ box which takes a valid password (over 8
characters) A ‘confirm password’ box which is valid if the same as the password
box And a submit button that only allows a submit to occur if the email,
password and confirm password boxes are valid.

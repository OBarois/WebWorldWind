var artifactory = require("artifactory-api");//("https://files.worldwind.arc.nasa.gov/artifactory", "emFjaDpoYzA6amRkNw==");
var fs = require("fs");

console.log(require);

console.log(artifactory);


var version = "v0.7.23";
// if (!process.env.TRAVIS_TAG || !process.env.TRAVIS_TAG.startsWith("v")) {
//     console.error("invalid version tag");
//     process.exit(101);
// } else {
//     version = process.env.TRAVIS_TAG.slice(1);
// }
//
// if (!process.env.FILES_API_KEY) {
//     console.error("missing file server api key");
//     process.exit(102);
// }

var a = new artifactory("https://files.worldwind.arc.nasa.gov/artifactory", "emFjaDpBS0NwNVozV1dDTHZLMlVvWGFidkFWV1Z5azg4TFVjQUZmV3BnQ0JOTktteUZVU0Q3U1A3YmFGOFVYTkJkNGNvOGtmelF6Szhq");

a.uploadFile("generic-local", version + "/worldwind.min.js", "../worldwind.min.js", false)
    .then(function (data) {
        console.log("in here");
        console.log(JSON.stringify(data));
    })
    .catch(function (err) {
        console.log("there was an error");
        console.log(err);
    });

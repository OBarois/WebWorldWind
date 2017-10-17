var ArtifactoryAPI = require("artifactory-api");
var recursive = require("recursive-readdir");

var version;
if (!process.env.TRAVIS_TAG || !process.env.TRAVIS_TAG.startsWith("v")) {
    console.error("invalid version tag");
    process.exit(101);
} else {
    version = process.env.TRAVIS_TAG.slice(1);
}

if (!process.env.FILES_API_KEY) {
    console.error("missing file server api key");
    process.exit(102);
}

var artifactory = new ArtifactoryAPI("https://files.worldwind.arc.nasa.gov/", process.env.FILES_API_KEY);

// upload files
artifactory.uploadFile("generic-local", "/" + version + "/worldwind.min.js", "worldwind.min.js", false)
    .then(console.log)
    .catch(console.error);
artifactory.uploadFile("generic-local", "/" + version + "/worldwind.js", "worldwind.js", false)
    .then(console.log)
    .catch(console.error);
artifactory.uploadFile("generic-local", "/" + version + "/images.zip", "images.zip", false)
    .then(console.log)
    .catch(console.error);
recursive("images", function (err, files) {
    if (err) {
        console.error(err);
        return;
    }

    for (var i = 0, len = files.length; i < len; i++) {
        var file = files[i];
        console.log("Uploading " + file + "...");
        artifactory.uploadFile("generic-local", "/" + version + "/" + file, file, false)
            .then(console.log)
            .catch(console.error);
    }
});



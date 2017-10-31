var express = require('express');

var port = process.env.PORT | 3000;

var server = express();
server.use(express.static(process.cwd()));

var port = process.env.PORT | 3000;
server.listen(port, function () {
    console.log('server listening on port ' + port);
});

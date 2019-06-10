const express = require('express');
const app = express();
app.use(express.static('./dist/song-request-client-angular'));
app.get('/*', function (req, res) {
 res.sendFile(__dirname + '/dist/song-request-client-angular/index.html');
});
app.listen(process.env.PORT || 8080);
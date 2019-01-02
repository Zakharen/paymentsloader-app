const express = require('express');
const app = express();

const port = 4200;

app.use(express.static(__dirname));
app.use('/*', function(req, res) {
    const root = __dirname.split('/server')[0] + '/dist/paymentloader-app';
    console.log('NG SERVER dirname', root);
    res.sendFile(root + '/index.html');
});

app.use(function(req, res) { //put this at end
    res.status(404);//add this line for setting 404 status
    res.render('404', {layout: false, title: '404: File Not Found'});
});

app.listen(port);

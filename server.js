/**
 * Created by Paul on 20/06/2015.
 */

var express = require('express'),
    swig = require('swig'),
    home = require('./routes/home');

var app = express();

app.set('views', __dirname + '/views');


var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now());
    }
}

app.use(express.static('public', options));

app.set('view engine', swig.view.e)

app.get('/', home.index);


app.listen(3000);
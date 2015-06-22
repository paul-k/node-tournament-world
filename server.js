/**
 * Created by Paul on 20/06/2015.
 */

var express = require('express'),
    swig = require('swig'),
    home = require('./routes/home');

var app = express();
var config = {
    port: process.env.PORT || 3000,
    staticOptions: {
        dotfiles: 'ignore',
        etag: false,
        extensions: ['htm', 'html'],
        index: false,
        maxAge: '1d',
        redirect: false,
        setHeaders: function(res, path, stat) {
            res.set('x-timestamp', Date.now());
        }
    }
};

app.use(express.static('public', config.staticOptions));

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.set('view cache', false);
swig.setDefaults({ cache: false });

app.get('/', home.index);


app.listen(config.port, function() {
    console.log('Running on port: ' + config.port);
});
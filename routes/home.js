/**
 * Created by Paul on 21/06/2015.
 */

exports.index = function(req, res, next) {
    res.render('home/index');
    next();
};
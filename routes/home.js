/**
 * Created by Paul on 21/06/2015.
 */

(function() {

    var controller = {
        index: function(req, res) {
            res.render('home/index');
        }
    };

    module.exports = controller;

})();
var users = require('../modals/user');

/*-----------------------signUp export---------------------------------*/

exports.signUp = function (req, res) {
    var message = '';
    users.signUp(req, function (err, result) {
        if (err) {
            message = "please fill up all fields"
            res.render('signUp.ejs', {message: message});
        } else {
            message = "Successfully signUp"
            res.render('signUp.ejs', {message: message});
        }

    });
}

/*-----------------------signIn export---------------------------------*/


exports.signIn = function (req, res) {
    users.signIn(req, function (err, result) {
        if (err) {
            res.redirect('/');
        } else if (!result) {
            res.redirect('/')
        } else {
            res.redirect('/userTasks');
        }

    });
}

var users = function func(options) {
    var self = this;
}
/*-----------------------signUp modal---------------------------------*/

users.signUp = function (req, callback) {
    var today = new Date();
    if (req.method == 'POST') {
        var post = req.body;
        var name = post.name;
        var password = post.password;
        var signUp = {
            name: name,
            password: password,
            created_at: today
        }
        var sql = 'insert into users SET ?';
        var query = db.query(sql, signUp, function (err, result) {
            callback(err, result);
        });
    }
}

/*-----------------------signIn modal---------------------------------*/

users.signIn = function (req, callback) {
    var sess = req.session;
    if (req.method == 'POST') {
        var post = req.body;
        var name = post.name;
        var password = post.password;
        var sql = "select name,password from users WHERE `name`='" + name + "' and password = '" + password + "'";
        var query = db.query(sql, function (err, result) {
            if (err) {
                callback(err, null);
            } else if (!result) {
                callback(null, null);
            } else {
                if (result.length > 0) {
                    if ((name == result[0].name) && (password == result[0].password)) {
                        /*-----------------------req.session---------------------------------*/
                        req.session.name = result[0].name;
                        req.session.user = result[0];
                        //req.session.user this specify you can other router other else you get undefined
                        /*-----------------------req.session---------------------------------*/
                        callback(err, result);
                    } else {
                        callback(err, null)
                    }
                }
            }
        });
    }
}
module.exports = users;

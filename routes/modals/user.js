var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

var users = function func(options){
    var self = this;
}
/*-----------------------signUp modal---------------------------------*/

users.signUp = function(req, callback){
    var today = new Date();
    if(req.method == 'POST'){
        console.log('sign Up');
        var post = req.body;
        var name = post.name;
        var password = post.password;
        //var passwordHash = bcrypt.hashSync(password, salt);
        var signUp = {
            name:name,
            password:password,
            created_at:today
        }
        console.log('sign up ,',signUp);
        var sql = 'insert into users SET ?';
        var query = db.query(sql,signUp,function(err, result){
            console.log(' in sql sign in',result);
            callback(err, result);
        });

    }
}

/*-----------------------signIn modal---------------------------------*/

users.signIn = function(req, callback) {
    var sess = req.session;
    if (req.method == 'POST') {
        console.log('sign in');
        var post = req.body;
        var name = post.name;
        var password = post.password;
        console.log('pass = ',password);
        console.log('name = ',name);
        var sql = "select name,password from users WHERE `name`='"+name+"' and password = '"+password+"'";
        var query = db.query(sql, function (err, result) {
            console.log('in query sign in',result);
            if (err) {
                console.log('in err')
                callback(err, null);
            } else if(!result) {
                console.log('in !result');
                callback(null, null);
            } else {
                if (result.length > 0) {
                    console.log('in len>0')
                    if ((name == result[0].name) && (password == result[0].password)) {
                        console.log('in result')
                        /*-----------------------req.session---------------------------------*/
                        req.session.name = result[0].name;
                        req.session.user = result[0];
                        //req.session.user this specify you can other router other else you get undefined
                        /*-----------------------req.session---------------------------------*/
                        console.log('in result sign')
                        console.log('session name = ', req.session.name);
                        console.log('session name = ', req.session.user);

                        callback(err, result);
                    } else {
                        console.log('in err length');
                        callback(err, null)
                    }
                }
            }
        });
    }
}
module.exports = users;

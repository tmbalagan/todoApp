exports.signIn = function(req, res){
    var message = '';
    res.render('signIn',{message: message});

};
exports.signUp = function(req, res){
    var message = '';
    res.render('signUp',{message: message});

};
exports.userTasks = function(req, res){
    var message = '';
    if(req.session.user == ''){
        res.redirect("/");
        return;
    }
};

exports.logout = function(req, res){
    var message = '';
    req.session.destroy(function(err) {
        res.redirect("/");
    })
};
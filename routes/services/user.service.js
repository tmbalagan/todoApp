var users = require('../modals/user');

/*-----------------------signUp export---------------------------------*/

exports.signUp = function(req, res){
    var message = '';
    users.signUp(req, function(err, result){
        if(err){
            //throw err;
            message = "please fill up all fields"
            console.log('in sevice up err');
        }else{
            message = "Successfully signUp"
            console.log('in sevice up result');
            //res.send({success:true});
            res.render('signUp.ejs',{message:message});
        }

    });
}

/*-----------------------signIn export---------------------------------*/


exports.signIn = function(req, res){
    var message = '';
    users.signIn(req, function(err, result){
        if(err){
            //throw err;
            console.log('in sevice in err');
            message = "Wrong Credentials"
            res.redirect('/');
        }else if(!result){
            console.log('in !result ---')
            //res.render('todoapp/tasks');
            res.redirect('/')
        }else{
            console.log('in success result');
            res.redirect('/userTasks');
            //res.send({success:true,data:result});
        }

    });
}

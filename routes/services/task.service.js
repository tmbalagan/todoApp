var tasks = require('../modals/tasks');

/*----------------------- save tasks service---------------------------------*/

exports.tasks = function(req, res) {
    tasks.saveTasks(req, function(err, result){
        if(err){
            throw err;
        }else{
            res.redirect('/userTasks');
        }
    });
}

/*-----------------------get tasks service---------------------------------*/

exports.userTasks = function(req, res) {
    tasks.getTasks(req, function(err, result){
        if(err){
            throw err;
        }else{
            var name = req.session.name;
            if(name == undefined){
                res.redirect("/");
                return;
            }else{
                var message = "hhh"
                res.render('userTask',{data:result});
            }
        }
    });
}

/*-----------------------delete tasks service---------------------------------*/

exports.delUserTask = function(req, res) {
    tasks.deleteTask(req, function(err, result){
        if(err){
            throw err;
        }else{
            var message = "Deleted Successfully"
            res.render('userTask',{data:result});
        }
    });
}

/*-----------------------update tasks service---------------------------------*/

exports.editUserTask = function(req, res) {
    tasks.editTask(req, function(err, result){
        if(err){
            throw err;
        }else{
            res.render('userTask',{data:result});
        }
    });
}
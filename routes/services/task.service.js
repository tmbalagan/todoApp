var tasks = require('../modals/tasks');

/*----------------------- save tasks service---------------------------------*/

exports.tasks = function(req, res) {
    tasks.saveTasks(req, function(err, result){
        if(err){
            throw err;
        }else{
            //console.log('result = ',result);
            res.redirect('/userTasks');
            //res.status(200);
        }
    });
}

/*-----------------------get tasks service---------------------------------*/

exports.userTasks = function(req, res) {
    tasks.getTasks(req, function(err, result){
        if(err){
            throw err;
        }else{
            console.log('result = ',result);
            //res.send({success:true,data:result})
            console.log(' req.session.name = ', req.session.name);
            //var user = req.session.user;
            var name = req.session.name;
            if(name == undefined){
                console.log('in usertask /');
                res.redirect("/");
                return;
            }else{
                console.log('in usertask ejs');
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
            console.log('result = ',result);
            //res.send({success:true,data:result})
            //res.render('userTask.ejs');

        }
    });
}

/*-----------------------update tasks service---------------------------------*/

exports.editUserTask = function(req, res) {
    tasks.editTask(req, function(err, result){
        if(err){
            throw err;
        }else{
            console.log('result = ',result);
            res.render('userTask',{data:result});
            //res.redirect("/userTask");
        }
    });
}
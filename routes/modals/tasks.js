
var task = function fun(option) {
    var self = this;
}
/*-----------------------saveTasks modal---------------------------------*/

task.saveTasks = function(req, callback){
    var sess = req.session;
    if (req.method == 'POST') {
        var post = req.body;
        var task = post.text;
        var newTask = {
            text:task,
            created_date:new Date(),
            name: req.session.name
        }
        var sql = 'insert into tasks SET ?';
        db.query(sql,newTask,function(err, result){
            callback(err,result);
        });
    }
}

/*-----------------------getTasks modal---------------------------------*/


task.getTasks = function(req, callback){
    var name = req.session.name;
    var sql = 'select text, created_date,task_id from tasks WHERE `name`= ?';
    db.query(sql, [name],function (err, result) {
        callback(err,result);
    });
}

/*-----------------------deleteTasks modal---------------------------------*/


task.deleteTask = function(req, callback){
    var task_id = req.params.delete_id;
    var sql = 'delete from tasks WHERE `task_id`= ?';
    db.query(sql, [task_id],function (err, result) {
        callback(err,result);
    });
}

/*-----------------------editTasks modal---------------------------------*/

task.editTask = function(req, callback){
    var task_id = req.params.update_id;
    var task = req.body.text;
    var sql = 'UPDATE tasks SET `text` = ? WHERE `task_id` = ?';
    db.query(sql, [task, task_id],function (err, result) {
        console.log('in edit task sql');
        callback(err,result);
    });
}
module.exports = task;
//module dependencies
var express = require('express')
/*-----------------------routes directory---------------------------------*/
    , route_user = require('./routes/user')
    , routes = require('./routes')
    , route_task = require('./routes/tasks');

var path = require('path');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var app = express();
var mysql      = require('mysql');
var bodyParser = require("body-parser");

//mysql database connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'mysql',
    database : 'login'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

global.db = connection;

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});


var options = {
    host: 'localhost',// Host name for database connection.
    port: 3306,// Port number for database connection.
    user: 'root',// Database user.
    password: 'mysql',// Password for the above database user.
    database: 'login',// Database name.
    checkExpirationInterval: 900000,// How frequently expired sessions will be cleared; milliseconds.
    expiration: 86400000,// The maximum age of a valid session; milliseconds.
    createDatabaseTable: true,// Whether or not to create the sessions database table, if one does not already exist.
    connectionLimit: 1,// Number of connections when creating a connection pool
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
};
var sessionStore = new MySQLStore(options);

app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'pingpong',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { maxAge: 60000 }
}));
/*-----------------------routes---------------------------------*/
app.get('/', routes.signIn);//call for main signIn page
app.get('/signUp', routes.signUp);//call for signUp page
//app.get('/userTasks', routes.userTasks);//call for signUp page
app.get('/logout', routes.logout);
app.use('/',route_user);
app.use('/',route_task);

app.listen(8080, function () {
    console.log('todoapp url = http://localhost:8080');
});


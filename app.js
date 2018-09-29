var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongodb = require("mongodb");
var Algebrite = require('algebrite');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var inviteRouter = require('./routes/invite');
var integrationRouter = require('./routes/integration');
var homeRouter = require('./routes/home');
var calculateRouter = require('./routes/calculate');
var flaecheRouter = require('./routes/flaeche');
var ableitenRouter = require('./routes/ableiten');
var vereinfacherRouter = require('./routes/vereinfacher');
var vergleicherRouter = require('./routes/vergleicher');
var impressumRouter = require('./routes/impressum');
var infoRouter = require('./routes/info');
var scheitelRouter = require('./routes/scheitelpunktform');
var nullstellenRouter = require('./routes/nullstellen');
var gleichungenRouter = require('./routes/gleichungen');

var inkocnitoflaecheRouter = require('./routes/inkocnitoflaeche');
var app = express();

// mongodb
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://connect_mongoadmin:cah9aiKohc@localhost:31187/?authMechanism=SCRAM-SHA-1&authSource=admin";

MongoClient.connect(url, function (err, mongoClient) {
    if (err) throw err;
    var db = mongoClient.db("mathdb");


// view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', homeRouter);
    app.use('/invite', inviteRouter);
    app.use('/inkocnitoflaeche', inkocnitoflaecheRouter);
    app.use('/users', usersRouter);
    app.use('/integration', integrationRouter);
    app.use('/home', homeRouter);
    app.use('/calculate', calculateRouter);
    app.use('/flaeche', flaecheRouter);
    app.use('/ableiten', ableitenRouter);
    app.use('/vereinfacher', vereinfacherRouter);
    app.use('/vergleicher', vergleicherRouter);
    app.use('/info', infoRouter);
    app.use('/impressum', impressumRouter);
    app.use('/scheitelpunktform', scheitelRouter);
    app.use('/nullstellen', nullstellenRouter);
    app.use('/gleichungen', gleichungenRouter);
    app.use('/*', homeRouter);


    function getClientIp(req) {
        var ipAddress;
        // The request may be forwarded from local web server.
        var forwardedIpsStr = req.header('x-forwarded-for');
        if (forwardedIpsStr) {
            // 'x-forwarded-for' header may return multiple IP addresses in
            // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
            // the first one
            var forwardedIps = forwardedIpsStr.split(',');
            ipAddress = forwardedIps[0];
        }
        if (!ipAddress) {
            // If request was not forwarded
            ipAddress = req.connection.remoteAddress;
        }
        return ipAddress;
    }

    app.post("/login", function (req, res, next) {

        db.collection("users").insert({"test":"hallo"});
        res.redirect("/home")
    });




// catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });

// error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
})

module.exports = app;

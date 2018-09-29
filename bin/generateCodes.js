var bcrypt = require("bcryptjs");
const fs = require("fs");

var anzCodes = 100;


var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://connect_mongoadmin:cah9aiKohc@localhost:31187/?authMechanism=SCRAM-SHA-1&authSource=admin";



MongoClient.connect(url, function (err, mongoClient) {
    if (err) throw err;
    var db = mongoClient.db("math_helperdb");


    function generatePassword() {
        var length = 6,
            charset = "abcdefghijkmnopqrstuvwxyz123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    function hashpassword(password, cb) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }

    var inhalt = "";
    for (var i = 1; i <= anzCodes; i++) {

        var password = generatePassword();
        var hashedPassword = hashpassword(password);

        db.collection("codes").insert(
            {
                "code": hashedPassword
            },


            (err) => {
            if (err) throw err;

        inhalt += "code" + i + ": " + password + "\n";

    }



    setTimeout(function () {
        console.log(inhalt);
        db.close();
    }, anzCodes *100);



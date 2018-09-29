var express = require('express');
var router = express.Router();
//var nerdamer = require('nerdamer');
var Algebrite = require('algebrite');
var math = require('math.js');
/* GET home page. */
router.get('/', function(req, res, next) {




   var func;
    var intvar;
    var x = "hi";
    function integrate(){

        func = "arcsin(x)"; //$("#mathterm").val();
        intvar = "x"; //$("#intvar").val();
        func = func.split(',').join(("."));
        x = Algebrite.eval('integral(' + func + ')').toString()
        //x = nerdamer('integrate(' + func + ', ' + intvar + ')');
        console.log(x);
        //$("#result").val(x.toString() + " + c");

    }

    integrate();


    res.render('integration', { title: x+"" });
});

module.exports = router;

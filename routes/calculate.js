var express = require('express');
var router = express.Router();

var app = express();
var Algebrite = require('algebrite');
var Mathjs = require('mathjs');

var algebra = require('algebra.js');

router.post('/integrate', function (req, res) {

    var func1;
    var x = "";
    function integrate(){
        func1 = req.body.func1;
        func1 = func1.split(',').join(("."));
        x = Algebrite.run('integral(' + func1 + ')').toString();
        x = x.split('.').join((","));
    }
    integrate();


    res.send(x);
});

router.post('/flaeche', function (req, res) {
    var x = "";
    var func = req.body.func;
    var ergebnis;
    var start = req.body.start;
    start = Mathjs.eval(start);
    var end = req.body.end;
    end = Mathjs.eval(end);
    var fl1;
     var fl2;

    func = Algebrite.eval('integral(' + func + ')').toString();

    fl1 = Mathjs.eval(func, {x:start});
    fl2 = Mathjs.eval(func, {x:end});
    ergebnis = Mathjs.eval(fl2+"-"+fl1);

    res.send(ergebnis +"");

});

router.post('/flaeche2', function (req, res) {
    var x = "";
    var func = req.body.func;

    var start = req.body.start;
    start = Mathjs.eval(start);
    var end = req.body.end;
    end = Mathjs.eval(end);

    var funcdummy;
    var area1 = 0.0;
    var area2 = 0.0;
    var areadummy = 0;
    var genauigkeit = 0.05;

        for(var i = parseFloat(start); i < parseFloat(end); i+= genauigkeit){

                funcdummy = func.split('x').join(i);

                areadummy = Mathjs.eval(funcdummy)*genauigkeit;
                if(areadummy<0){

                    area1 = area1 - areadummy;
                }else{

                    area1 = area1 + areadummy;
                }



        }

        for(var b = parseFloat(start); b < parseFloat(end)-genauigkeit; b+= genauigkeit){


            funcdummy = func.split('x').join(b);

            areadummy = Mathjs.eval(funcdummy)*genauigkeit;
            if(areadummy<0){

                area1 = area1 - areadummy;
            }else{

                area1 = area1 + areadummy;
            }


        }

        areadummy = (area1+area2)/2;
        areadummy = Math.round(areadummy*1000)/1000;

    res.send(areadummy +"");

});

router.post('/ableiten', function (req, res) {
    var func2;
    var x = "";

    function integrate(){
        func2 = req.body.func;
        func2 = func2.split(',').join(("."));
        x = Algebrite.run('d(' + func2 + ')').toString();
        x = x.split('.').join((","));
    }
    integrate();

    res.send(x);

});


router.post('/vereinfachen', function (req, res) {
    var func3;
    var x = "";


        func3 = req.body.func;
        func3 = func3.split(',').join(("."));
        x = Algebrite.run(func3).toString();
        x = x.split('.').join((","));


    res.send(x);




});

router.post('/gleichung', function (req, res) {

    var ergebnis2 ="[";
var variable = req.body.variable;
    var eq = req.body.func;
    eq = eq.split(',').join(("."));
    eq = algebra.parse(eq);

    var x = eq.solveFor(variable);




    var dummy = x.toString();


    dummy = dummy.split(",");

    for(var i = 0; i< dummy.length ; i++){

        if(i === dummy.length -1) {


            ergebnis2 +=  Math.round(Mathjs.eval(dummy[i]) * 10000) / 10000 ;
        }else{
            ergebnis2 +=  Math.round(Mathjs.eval(dummy[i]) * 10000) / 10000 + " , ";
        }
    }


    ergebnis2 += "]";
    ergebnis2 = ergebnis2.split('.').join((","));
    res.send(variable +" = "+ergebnis2.toString());
});


router.post('/nullstellen', function (req, res) {

    var ergebnis2 = "[";
    var eq = req.body.func +" = 0";
    eq = eq.split(',').join(("."));
    eq = algebra.parse(eq);

    var x = eq.solveFor("x");

      var dummy = x.toString();


         dummy = dummy.split(",");

       for(var i = 0; i< dummy.length ; i++){

             if(i === dummy.length -1) {


                 ergebnis2 +=  Math.round(Mathjs.eval(dummy[i]) * 10000) / 10000 ;
             }else{
                 ergebnis2 +=  Math.round(Mathjs.eval(dummy[i]) * 10000) / 10000 + " , ";
             }
         }


    ergebnis2 += "]";

    res.send(ergebnis2.toString());

});

router.post('/vergleichen', function (req, res) {
    var term1 ="";
    var term2 ="";

    var ergebnis = "";
var ergeb1;
var ergeb2;
    function integrate(){
        term1 = req.body.term1;
        term2 = req.body.term2;
        term1 = term1.split(',').join(("."));
        term2 = term2.split(',').join(("."));
        term1 = Algebrite.run(term1).toString();
        term2 = Algebrite.run(term2).toString();


        ergeb1 = Mathjs.eval(term1 +"+ x", {a:5,b:4,c:6,d:7,x:3,y:5,z:10});
        ergeb2 = Mathjs.eval(term2 +"+ x", {a:5,b:4,c:6,d:7,x:3,y:5,z:10});
    }
    integrate();

    if(term1 === term2 || ergeb1 === ergeb2){
    ergebnis = "Beide Terme sind gleich";
    }else{
        ergebnis = "Die Terme sind nicht gleich";
    }

    res.send( {"ergebnis": ergebnis, "term1":term1,"term2":term2, "ergeb1":ergeb1,"ergeb2":ergeb2});

});

router.post('/scheitel', function (req, res) {
    var xhoch2 ="";
    var xhoch1 ="";
    var xhoch0 ="";
var dummy;
var ergebnis = "";


    xhoch2 = req.body.xhoch2;
    xhoch1 = req.body.xhoch1;
    xhoch0 = req.body.xhoch0;
    xhoch2 = xhoch2.split(',').join(("."));
    xhoch1 = xhoch1.split(',').join(("."));
    xhoch0 = xhoch0.split(',').join(("."));

    xhoch2 = parseFloat(xhoch2);
    xhoch1 = parseFloat(xhoch1);
    xhoch0 = parseFloat(xhoch0);

    xhoch1 = xhoch1/xhoch2;
    xhoch0 = xhoch0/xhoch2;
    dummy = (xhoch1/2);

    ergebnis = xhoch2 +"*(x^2 +" +  dummy +") +" +(xhoch0 -dummy*dummy);

    res.send(ergebnis);

});



module.exports = router;
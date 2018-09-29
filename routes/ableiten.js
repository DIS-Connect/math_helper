var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('ableiten', { title: 'Math_Helper' });
});

module.exports = router;

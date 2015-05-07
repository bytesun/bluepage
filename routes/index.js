var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
    res.render('index',{user : req.user });
});

router.get('/pages', function(req, res) {
    res.render('page_list',{user : req.user });
});

router.get('/ideas', function(req, res) {
    res.render('idea_list',{user : req.user });
});

router.get('/cases', function(req, res) {
    res.redirect('/cases/list');
});


module.exports = router;

// modules =================================================
var express        = require('express');
 session = require('express-session'),
 app            = express(),
 bodyParser     = require('body-parser'),
 methodOverride = require('method-override'),
 path = require('path'),
 favicon = require('serve-favicon'),
 logger = require('morgan'),
 bcrypt = require('bcryptjs'),
 cookieParser = require('cookie-parser'),
 csrf = require('csurf');



// configuration ===========================================
// config files
var db = require('./config/db');

var index = require('./routes/index');
var user = require('./routes/user');
var ocase = require('./routes/ocase');

//===============PASSPORT=================
var mongoose = require( 'mongoose' );
var User = mongoose.model('User');

var passport = require('passport');
var PassportLocalStrategy = require('passport-local');

var localAuth =   new PassportLocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true 
     },
function(req, email, password, done) { 
    User.findOne({ 'email' :  email }, function(err, user) {
        if (err)
            return done(err);
        if (!user)
            return done(null, false, req.flash('loginError', 'No user found.try Again')); 

         if(!bcrypt.compareSync(password, user.password)){
        	 return done(null, false, req.flash('loginError', 'Password Error.try Again'));
         }else{
        	 console.log('user:'+user);
         }

        return done(null, user); 

    });

});

var signupLocal = new PassportLocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true 
},
function(req, email, password, done) {

    User.findOne({ 'email' :  email }, function(err, user) {
        if (err)
            return done(err);
        if (user) {
            return done(null, false, req.flash('signupError', 'Email is already taken.'));
        } 
        else {
       var newUser  = new User();
       
            newUser.username = req.body.username;
            newUser.email    = email;
            newUser.password = bcrypt.hashSync(password, 8); 
            newUser.save(function(err) {
                if (err)
                    throw err;
                return done(null, newUser);
            });
           }
    });
});

var authSerializer = function(user, done) {
	done(null, user.id);
};

var authDeserializer = function(id, done) {
	User.findById(id, function(error, user) {
		done(error, user);
	});
};

passport.use('signin',localAuth);
passport.use('signup',signupLocal);
passport.serializeUser(authSerializer);
passport.deserializeUser(authDeserializer);


// ... continue with Express.js app initialization ...
app.use(require('connect-flash')()); // see the next section

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/assets/img/favicon.ico'));
app.use(session({secret: 'ssssffffopencase',saveUninitialized: true, resave: true}));

app.use(passport.initialize());
app.use(passport.session());

// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

app.use(csrf());

// routes ==================================================
app.use('/', index);
app.use('/', user);
app.use('/', ocase);

	app.get("/login", function(req, res){
		console.log('load login');
	    res.render('login', { csrfToken: req.csrfToken() });
	});

	app.get("/myspace", function(req, res){
		console.log('load myspace page');
	    res.render('myspace', { csrfToken: req.csrfToken() });
	});
	
	app.get("/api/auth", function(req, res){
//		if(req.user){
//			res.cookie('user_id', req.user._id, { signed: true, maxAge: config.cookieMaxAge  });
//			res.cookie('auth_token', req.user.auth_token, { signed: true, maxAge: config.cookieMaxAge  });
//			res.render({ user: _.omit(user, ['password', 'auth_token']) });
//		}else{
//			res.render({ error:"no valide login cookie"});
//		}	
			console.log('check authentication');
//			res.cookie('user_id', 'orcsun');
//			res.cookie('auth_token', 'sldjflsdjf;las');
			res.send({ user: {id:'orcsun',username:'orcsun',name:'sun',email:'orcsun@163.com'} });			
	});
	
	app.post("/api/auth/signin",passport.authenticate('signin', {
		successRedirect : '/', 
		failureRedirect : '/login',
		successFlash : 'successfully login',
		failureFlash : true 
	}));

  app.post("/api/auth/signup",passport.authenticate('signup', {
		successRedirect : '/profile', 
		failureRedirect : '/signup',
		failureFlash : true 
	}));



  app.get("/profile",isLoggedIn,function(req,res)
  {
	console.log('profile calling');
	res.redirect("/login");
	 // res.send(req.user);
  });

  app.get('/logout',isLoggedIn, function(req, res) {
		   	req.logout();
		res.redirect('/');
  });



  function isLoggedIn(req, res, next) {	
 	if (req.isAuthenticated()){
 		return next();
 	}else{
 		res.send(401);
 	}
   }

   function isLoggedIns(req, res, next) {

 	if (req.isAuthenticated())
 		res.redirect('/profile');
	else
		return next();
   }


/// catch 404 and forward to error handler
//Session-persisted message middleware
app.use(function(req, res, next){
  var err = req.session.error,
      msg = req.session.notice,
      success = req.session.success;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;

  next();
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

//development error handler
//will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: err
      });
  });
}

//production error handler
//no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: {}
  });
});


var server = app.listen(parseInt(process.env.OPENSHIFT_NODEJS_PORT) || 8080,process.env.OPENSHIFT_NODEJS_IP, function() {
console.log('Express server listening on port ' + server.address().port);
});
   
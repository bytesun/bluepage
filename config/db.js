var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

//users
var User = new Schema({
	uid : String,
	uname : String,
	openid : String,
	email : String,
	password : String,
	role : Number,
	bio : String,
	tags : String
	
});

var Follow = new Schema({
	follower : Schema.Types.ObjectId,
	followho : Schema.Types.ObjectId
});

var Favorite = new Schema({
	uid : Schema.Types.ObjectId,
	caseid : Schema.Types.ObjectId
});

// applications
var OCase = new Schema({
    subject    : String,
    description : String,
    tags       : String,
    startdate  : Date,
    endate     : Date,
    status     : Number,
    ctype      : Number,
    isprivate  : Boolean,
    currentStep : Number,
    uid        : Schema.Types.ObjectId

});
 
var Step = new Schema({
	index : Number,
	step : String,
	note : String,
	caseid : Schema.Types.ObjectId,
	createdate : Date	
});

var Todo = new Schema({
	   todo:String,
	   note:String,
	   priority:Number,
	   owner:Schema.Types.ObjectId,
	   caseid:Schema.Types.ObjectId,
	   stepIndex:Number,
	   plantime:Date,
	   dotime:Date,
	   status:Number
});

var Comment = new Schema({
	    comment:String,
		ctime:Date,
		who:Schema.Types.ObjectId,
		status:Number,
		ctype:Number,
		refid:Schema.Types.ObjectId
});

var Tag = new Schema({
	tag : String,
	count : Number,
	note : String
});

var Question = new Schema({
	question:String,
	description:String,
	
});

var Answer = new Schema({
	
});


//admin
var Notification = new Schema({
	
});

var Message = new Schema({
	
});

var Trace = new Schema({
	
});


mongoose.model( 'User', User );
mongoose.model( 'Follow', Follow );
mongoose.model( 'Favorite', Favorite );
mongoose.model( 'OCase', OCase );
mongoose.model( 'Step', Step );
mongoose.model( 'Todo', Todo );
mongoose.model( 'Comment', Comment );
mongoose.model( 'Tag', Tag );
mongoose.model( 'Question', Question );
mongoose.model( 'Answer', Answer );
mongoose.model( 'Notification', Notification );
mongoose.model( 'Message', Message );
mongoose.model( 'Trace', Trace );

var host = process.env.OPENSHIFT_MONGODB_DB_HOST||"localhost";
var port = process.env.OPENSHIFT_MONGODB_DB_PORT||'27017';
var username = process.env.OPENSHIFT_MONGODB_DB_USERNAME||'';
var password = process.env.OPENSHIFT_MONGODB_DB_PASSWORD||'';
 
mongoose.connect( 'mongodb://'+username+':'+password+'@'+host+':'+port+'/ocase' );
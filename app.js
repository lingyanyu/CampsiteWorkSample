const express=require("express"),
      app= express(),
	  bodyParser= require("body-parser"),
	  mongoose=require("mongoose"),
	  Campround= require("./models/campground"),
	  seedDB=require("./seeds"),
	  passport=require("passport"),
	  LocalStrategy=require("passport-local"),
	  User= require("./models/user"),
	  methodOverride= require("method-override"),
	  flash=require("connect-flash"),
	  Comment= require("./models/comment");
const commentRoutes= require("./routes/comments"),
	  indexRoutes= require("./routes/index"),
	  campgroundRoutes= require("./routes/campgrounds");

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extend:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

//passport configuration
app.use(require("express-session")({
	secret:"What does secret for",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(3000, ()=>{
	console.log("app started");
})
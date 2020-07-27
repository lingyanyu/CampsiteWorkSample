const express=require("express");
const router= express.Router();
const passport= require("passport");
const User= require("../models/user");
const middleware=require("../middleware");


router.get("/",(req,res)=>{
	res.render("landing");
});


//sign up route -form
router.get("/register",(req,res)=>{
	res.render("register");
});
//sign up route -logical
router.post("/register",(req,res)=>{
	req.body.username
	req.body.password
	User.register(new User({
		username:req.body.username
	}),req.body.password,(err,user)=>{
		if(err){
			console.log("EERRR");
			req.flash("error","Username taken");
			return res.render("register");
		}
		passport.authenticate("local")(req,res,()=>{
			req.flash("success","Welcome to YelpCamp "+user.username);
			res.redirect("/campgrounds");
		});

	});
});


//login route -form
router.get("/login",(req,res)=>{
	res.render("login");
})

//login route -logical
router.post("/login",passport.authenticate("local",
	{
		successRedirect:"/campgrounds",
		failureRedirect:"/login"
	}),(req,res)=>{
});

//logout route
router.get("/logout",(req,res)=>{
	req.logout();
	req.flash("success","Logged out");
	res.redirect("/campgrounds");
});

//middleware


module.exports=router;
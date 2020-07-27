
const express=require("express");
const router= express.Router();
const Campround=require("../models/campground");
const middleware=require("../middleware");

//index route
router.get("/", (req,res)=>{
	Campround.find({},(err,allCampgrounds)=>{
		if(err) console.log(err);
		else {
			res.render("campgrounds/campgrounds",{campgrounds:allCampgrounds,currentUser:req.user});
		}
	});
});

//CREATE
router.post("/", middleware.isLoggedIn, (req,res)=>{
	//get data from form
    let name = req.body.name;
    let image= req.body.image;
    let price= req.body.price;
    let description=req.body.description;
    let author={
    	id: req.user._id,
    	username: req.user.username
    };
    let newCampground= {name:name,image:image,description:description,author:author,price:price};
    Campround.create( newCampground,(err,campround)=>{
		if(err) console.log(err);
		else {
			//redirect back to campgrounds
			res.redirect("/campgrounds");
		}
	})	
})

// NEW
router.get("/new", middleware.isLoggedIn, (req,res)=>{
	res.render("campgrounds/new");
})

//SHOW show more info about one campground

router.get("/:id", (req,res)=>{
	Campround.findById(req.params.id).populate("comments").exec((err,foundCampground)=>{
		if(err) console.log(err);
		else{
			res.render("campgrounds/show",{campground:foundCampground});
		}
	})
})


//EDIT campground route
router.get("/:id/edit",middleware.checkCampgroundOwnership,(req,res)=>{
	//is user logged in?
    	//does the user own the campground?
    	Campround.findById(req.params.id,(err,foundCampground)=>{
			res.render("campgrounds/edit",{campground:foundCampground});
	    }
    )
})


//UPDAET campground route

router.put("/:id",middleware.checkCampgroundOwnership, (req,res)=>{
	Campround.findByIdAndUpdate(req.params.id,req.body.camp, (err,updatedCampground)=>{
		if(err) {
			res.redirect("/campgrounds");
		}
		else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
})

//DESTORY campground route
router.delete("/:id",middleware.checkCampgroundOwnership,(req,res)=>{
	Campround.findByIdAndRemove(req.params.id, (err)=>{
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			res.redirect("/campgrounds");
		}
	})
})

//middleware


module.exports=router;

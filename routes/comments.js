const express=require("express");
const router= express.Router({mergeParams:true});
const Campround=require("../models/campground");
const Comment=require("../models/comment");
const middleware=require("../middleware");

//comment new route

router.get("/new", middleware.isLoggedIn, (req,res)=>{
	Campround.findById(req.params.id,(err,campground)=>{
		if(err) console.log(err);
		else{
			res.render("comments/new",{campground:campground});
		}
	})
})

//comment create route

router.post("/",middleware.isLoggedIn,(req,res)=>{
	//find campground by id
    Campround.findById(req.params.id, (err,campground)=>{
    	if(err){
    		console.log(err);
            req.flash("error","Something went wrong");
    		redirect("/campgrounds");
    	}else{
    		Comment.create(req.body.comment,(err,comment)=>{
    			if(err){
    				console.log(err);
    			}
    			else{
                    //add username and id to comment
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    //save comment
                    comment.save();
    				campground.comments.push(comment);
    				campground.save();
                    req.flash("success","Successfully added comment");
                    res.redirect("/campgrounds/"+campground.id);
    			}
    		})
    	}
    })
});

//EDIT comment route

router.get("/:comments_id/edit",middleware.checkCommentOwnership,(req,res)=>{
    Comment.findById(req.params.comments_id,(err,foundComment)=>{
        if(err){
            res.redirect("back");
        }
        else{
            res.render("comments/edit" ,{campground_id:req.params.id, comment:foundComment});
        }
    })
    
})
//UPDATE comment route

router.put("/:comments_id",middleware.checkCommentOwnership,(req,res)=>{
    Comment.findByIdAndUpdate(req.params.comments_id,req.body.comment,(err,updatedComment)=>{
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
    // res.send("everything is correct by far");
});

//DESTORY comment route
router.delete("/:comments_id",middleware.checkCommentOwnership,(req,res)=>{
    Comment.findByIdAndRemove(req.params.comments_id, (err)=>{
        if(err){
            res.redirect("back");
        }
        else{
            req.flash("success","Deleted Successfully");
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})


module.exports=router;
// all middleware goes here
const Campround=require("../models/campground");
const Comment=require("../models/comment");

let middlewareObj={};
middlewareObj.checkCampgroundOwnership = function(req,res,next){
    if(req.isAuthenticated()){
    	//does the user own the campground?
    	Campround.findById(req.params.id,(err,foundCampground)=>{
			if(err) {
				req.flash("error","campground not found");
				res.redirect("back");
			}
			else {
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				}
				else{
                    req.flash("error","You don't have permission to do that");
                    res.redirect("back");
				}	
			}
		}); 
    } else{
    	req.flash("error","You need to Login")
    	res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership= function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comments_id,(err,foundComment)=>{
            if(err){
                res.redirect("back");
            }
            else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                	req.flash("error","You don't have permission to do that");
                    res.redirect("back");
                }
            }
        })
    }
    else{
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","Please Login First!");
	res.redirect("/login");
}


module.exports= middlewareObj;
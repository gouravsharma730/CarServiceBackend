const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Reviews = require('../models/RatingAndReview')

router.post('/',verifyToken,(req,res)=>{
    let review = req.body;
    if(!review) return res.status(400).json({message:"Please add comment!"});
    review.userName = req.user.userName;
    const reviews = new Reviews(review);
    reviews.save();
    return res.status(200).json({message:review});
})

router.get('/',verifyToken, async function (req,res){
    const reviews = await Reviews.find({});
    return res.status(200).json({message:reviews});
})

router.post('/comment',verifyToken,async function(req,res){
    try{
        const comments = req.body;
        comments.user = req.user.id; 
        const _id = req.body.reviewId;
        const review = await Reviews.findOneAndUpdate({_id},
            {$push:{
                comments:comments
            }},{new:true});
        return res.status(200).json({message:review});
    }catch(error){
        return res.status(400).json({message:error.message});
    }
})

router.post('/likes',verifyToken,async function (req,res){
    try{
        const user = req.user.id;
        const _id = req.body._id;
        let checkReview= await Reviews.findById({_id});
        if(!checkReview) return res.status(404).json({message:"Review not found"});
        let liked = checkReview.likes.includes(user);
        let incLike;
        if(liked){
            incLike = await Reviews.findOneAndUpdate({_id},
                {$pull:{
                    likes:user
                }},{new:true});
        }else{
            incLike = await Reviews.findOneAndUpdate({_id},
                {$push:{
                    likes:user
                }},{new:true});
            }
        return res.status(200).json({message:incLike});
    }catch(error){
        return res.status(400).json({message:error.message})
    }
})

router.post('/dislikes',verifyToken,async function (req,res){
    try{
        const user = req.user.id;
        const _id = req.body._id;
        let checkReview = await Reviews.findById({_id});
        if(!checkReview) return res.status(404).json({message:"Review not found"});
        let disliked = checkReview.dislikes.includes(user);
        let incDislikes;
        if(!disliked){
            incDislikes= await Reviews.findOneAndUpdate({_id},
                {$push:{
                    dislikes:user
                }},{new:true});
        }else{
            incDislikes= await Reviews.findOneAndUpdate({_id},
                {$pull:{
                    dislikes:user
                }},{new:true});
            }
        return res.status(200).json({message:incDislikes});
    }catch(error){
        return res.status(400).json({message:error.message})
    }
})


module.exports = router;

"use strict"
var db = require('../db-connection');
const Review = require('./Review')

class ReviewDB  {
   addReview(request, respond) {
       var msg = " ";
       var reviewObject = new Review(null, request.body.userid, request.body.restaurant_id, request.body.rating, request.body.review_text, null, request.body.pictureurl);
       var sql = "INSERT INTO project.review (userid, restaurant_id, rating, review_text, datetime, pictureurl) VALUES (?, ?, ?, ?, NOW(), ?)";
       var values = [reviewObject.getUserId(), reviewObject.getRestaurantId(), reviewObject.getRating(), reviewObject.getReviewText(), reviewObject.getPictureUrl()];
       db.query(sql, values, function(error, result){
           if (error) {
               throw error;
           }
           else {
                msg = "Review Added";
                console.log(result);
                respond.json(msg);
           }
       });

   } 

   getUserReview(request, respond) {
       var sql = "SELECT project.review.rating, project.review.review_text, project.review.datetime, project.review.pictureurl FROM project.review INNER JOIN project.account_details ON project.review.userid = project.account_details.userid WHERE project.account_details.username = ?";
       var username = request.body.username;
       db.query(sql, username, function(error, result){
           if (error) {
               throw error;
           }
           else {
               respond.json(result);
           }
       });
   }

   deleteReview(request, respond) {
        var msg = " ";
        var sql = "DELETE FROM project.review WHERE review_id = ?";
        var reviewid = request.body.reviewid;
        db.query(sql, reviewid, function(error, result){
            if (error) {
                throw error;
            }
            else {
                msg = "Review successfully deleted";
                console.log(result);
                respond.json(msg);
            }

        });
   }

   updateReview(request, respond) {
       var msg = ' '
       var reviewObject = new Review(request.body.reviewid, null, null, request.body.rating, request.body.reviewtext, null, request.body.pictureurl);
       var sql = "UPDATE project.review SET rating = ?, review_text = ?, pictureurl = ? WHERE review_id = ?";
       var values = [reviewObject.getRating(), reviewObject.getReviewText(), reviewObject.getPictureUrl(), reviewObject.getReviewId()];
       db.query(sql, values, function(error, result){
           if (error) {
               throw error;
           }
           else {
               msg = "Review has been updated";
               console.log(result);
               respond.json(msg);
           }
       });



   }

   selectRestaurantReviews(request, respond) {
       var getrestid = "SELECT restaurant_id FROM project.restaurant_info WHERE name = ?"
       var name = request.body.name;
       db.query(getrestid, name, function(error, result){
           if (error) {
               throw error;
           }
           else {
               var restid = result[0].restaurant_id;
               console.log(restid);
               var sql = "SELECT review_id, rating, review_text, datetime, pictureurl FROM project.review WHERE restaurant_id = ?";
               db.query(sql, restid, function(error, result){
                   if (error) {
                       throw error;
                   }
                   else {
                       respond.json(result);
                   }
               });
           }
       });
   }






}
module.exports = ReviewDB
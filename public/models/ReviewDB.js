"use strict"
var db = require('../db-connection');
const Review = require('./Review')

class ReviewDB {
    addReview(request, respond) {
        var msg = " ";
        var reviewObject = new Review(null, request.body.userid, request.body.restaurant_id, request.body.rating, request.body.review_text, null, request.body.pictureurl);
        var sql = "INSERT INTO project.review (userid, restaurant_id, rating, review_text, datetime, pictureurl) VALUES (?, ?, ?, ?, NOW(), ?)";
        var values = [reviewObject.getUserId(), reviewObject.getRestaurantId(), reviewObject.getRating(), reviewObject.getReviewText(), reviewObject.getPictureUrl()];
        console.log("values here")
        console.log(values)
        db.query(sql, values, function (error, result) {
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
        var sql = "SELECT project.review.rating, project.review.review_text, project.review.datetime, project.review.pictureurl, project.review.review_id, project.restaurant_info.name, project.restaurant_info.restaurant_id FROM ((project.review INNER JOIN project.account_details ON project.review.userid = project.account_details.userid) INNER JOIN project.restaurant_info ON project.review.restaurant_id = project.restaurant_info.restaurant_id) WHERE review.userid = ?";
        var userid = request.body.userid;
        db.query(sql, userid, function (error, result) {
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
        db.query(sql, reviewid, function (error, result) {
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
        db.query(sql, values, function (error, result) {
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
        var restid = request.body.restid
        var sql = "SELECT review.review_id, review.rating, review.review_text, review.datetime, review.pictureurl, account_details.username, account_details.profile_url FROM project.review INNER JOIN project.account_details ON review.userid = account_details.userid WHERE restaurant_id = ?";
        db.query(sql, restid, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result)
            }
        });
    }

    getUsername(request, respond) {
        var getname = "SELECT account_details.username FROM project.account_details INNER JOIN project.review ON account_details.userid = review.userid WHERE review_id = ?";
        var reviewid = request.body.reviewid;
        db.query(getname, reviewid, function(error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }

    selectSpecifcReview(request, respond) {
        var sql = 'SELECT review.rating, review.review_text, review.pictureurl FROM project.review WHERE review_id = ?';
        var reviewid = request.body.reviewid;
        db.query(sql, reviewid, function(error, result){
            if (error) {
                throw error;
            }
            else {
                respond.json(result);
            }
        });
    }


}







module.exports = ReviewDB
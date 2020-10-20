"use strict"

const ReviewDB = require('../models/ReviewDB');

var ReviewDBDBObject = new ReviewDB();
function routeReview(app){

        app.route('/addreview')
            .post(ReviewDBDBObject.addReview);

        app.route('/getuserreview')
            .post(ReviewDBDBObject.getUserReview);

        app.route('/deletereview')
            .delete(ReviewDBDBObject.deleteReview);

        app.route('/updatereview')
            .put(ReviewDBDBObject.updateReview);

        app.route('/selectrestaurantreview')
            .post(ReviewDBDBObject.selectRestaurantReviews);
        app.route('/getusername')
        .post(ReviewDBDBObject.getUsername);
        app.route('/specificreview')
        .get(ReviewDBDBObject.selectSpecifcReview);
}
module.exports = {routeReview};
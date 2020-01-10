"use strict";

class Review {
    constructor(review_id, userid, restaurant_id, rating, review_text, datetime, pictureurl) {
        this.review_id = review_id;
        this.userid = userid;
        this.restaurant_id = restaurant_id;
        this.rating = rating;
        this.review_text = review_text;
        this.datetime = datetime;
        this.pictureurl = pictureurl;
    }
    //put the get methods here
    getReviewId() {
        return this.review_id;
    }

    getUserId() {
        return this.userid;
    }

    getRestaurantId() {
        return this.restaurant_id;
    }

    getRating() {
        return this.rating;
    }

    getReviewText() {
        return this.review_text;
    }

    getDateTime() {
        return this.datetime;
    }

    getPictureUrl() {
        return this.pictureurl;
    }

}
module.exports = Review;
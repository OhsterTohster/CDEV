"use strict";

class RestaurantInfo {
    constructor(restaurant_id, name, contact_number, restaurant_address, image_url, average_rating) {
     this.restaurant_id = restaurant_id;
     this.name = name;
     this.contact_number = contact_number;
     this.restaurant_address = restaurant_address;
     this.image_url = image_url;
     this.average_rating = average_rating;
    }
    //put the get methods here
    
    getRestaurantId() {
        return this.restaurant_address;
    }

    getName() {
        return this.name;
    }

    getContactNumber() {
        return this.contact_number;
    }

    getRestaurantAddress() {
        return this.restaurant_address;
    }

    getImageUrl() {
        return this.image_url;
    }

    getAverageRating() {
        return this.average_rating;
    }

    setRestaurantId() {
        this.restaurant_id = this.restaurant_id;
    }

    setName() {
        this.name = name;
    }

    setContactNumber() {
        this.contact_number = contact_number;
    }

    setRestaurantAddress() {
        this.restaurant_address = restaurant_address;
    }

    setImageUrl() {
        this.image_url = image_url;
    }

    setAverageRating() {
        this.average_rating = average_rating;
    }


}
module.exports = RestaurantInfo;
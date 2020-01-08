"use strict";

class RestaurantInfo {
    constructor(restaurant_id, name, contact_number, restaurant_address, image_url, average_rating) {
     this.restaurant_id = restaurant_id;
     this.name = name;
     this.contact_number = contact_number;
     this.restaurant_address = restaurant_address;
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

    get restaurant_address() {
        return this.restaurant_address;
    }

    getImageUrl() {
        return this.image_url;
    }

    getAverageRating() {
        return this.average_rating;
    }
}
module.exports = RestaurantInfo;
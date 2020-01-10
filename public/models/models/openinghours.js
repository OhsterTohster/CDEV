"use strict";

class OpeningHours {
    constructor(index, restaurant_id, opening_hours, day) {
        this.index = index;
        this.restaurant_id = restaurant_id;
        this.opening_hours = opening_hours;
        this.day = day;
    }
    //put the get methods here
    
    getIndex() {
        return this.index;
    }

    getRestaurantId() {
        return this.restaurant_id;
    }

    getOpeningHours() {
        return this.opening_hours;
    }

    getDay() {
        return this.day;
    }

}
module.exports = OpeningHours;
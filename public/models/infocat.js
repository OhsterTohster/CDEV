"use strict";

class InfoCat {
    constructor(index, restaurant_id, category_id) {
        this.index = index;
        this.restaurant_id = restaurant_id;
        this.category_id = category_id;
    }
    //put the get methods here
    
    getIndex() {
        return this.index;
    }

    getRestaurantId() {
        return this.restaurant_id;
    }

    getCategoryId() {
        return this.category_id;
    }

}
module.exports = InfoCat;
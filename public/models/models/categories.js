"use strict";

class Categories {
    constructor(category_id, Category) {
     this.category_id = category_id;
     this.Category = Category;
    }
    //put the get methods here
    
    getCategoryId() {
        return this.category_id;
    }

    getCategory() {
        return this.Category;
    }
}
module.exports = RestaurantInfo;
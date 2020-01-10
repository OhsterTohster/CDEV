"use strict"

const RestaurantDB = require('../models/RestaurantDB');

var RestaurantDBDBObject = new RestaurantDB();
function routeRestaurants(app){

        app.route('/addrestaurant')
            .post(RestaurantDBDBObject.addRestaurant);

        app.route('/updaterestaurant')
            .put(RestaurantDBDBObject.updateRestaurant);

        app.route('/deleterestaurant')
            .delete(RestaurantDBDBObject.deleteRestaurant);

        app.route('/displayrestaurant')
            .post(RestaurantDBDBObject.displayRestaurant);
        
        app.route('/addopeninghours')
            .post(RestaurantDBDBObject.addOpeningHours);

        app.route("/updateopeninghours")
            .put(RestaurantDBDBObject.updateOpeningHours);

        app.route('/addcategory')
            .post(RestaurantDBDBObject.addCategory);

        app.route('/assigncategory')
            .post(RestaurantDBDBObject.assignCategory);

        app.route('/removecategory')
            .delete(RestaurantDBDBObject.removeCategory);

        app.route('/search')
            .post(RestaurantDBDBObject.search);
        
        
    
        
    
    

}
module.exports = {routeRestaurants};
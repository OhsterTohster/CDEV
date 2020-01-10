"use strict";
var db = require('../db-connection');
const RestaurantInfo = require('./RestaurantInfo');

class RestaurantDB {
    addRestaurant(request, respond) {
        var msg = " ";
        var addRestaurantInfo = "INSERT INTO project.restaurant_info (name, contact_number, restaurant_address, image_url) VALUES (?, ?, ?, ?)";
        var addRestObject = new RestaurantInfo(null, request.body.name, request.body.contact_number, request.body.restaurant_address, request.body.image_url)
        var values = [addRestObject.getName(), addRestObject.getContactNumber(), addRestObject.getRestaurantAddress(), addRestObject.getImageUrl()]
        db.query(addRestaurantInfo, values, function(error, result) {
            if(error) {
                throw error;
            }
            else {
                msg = "Restaurant Successfully Added";
                console.log(result);
                respond.json(msg);
            }
        });
    } 

    updateRestaurant(request, respond) {
        var msg = " ";
        var getrestid = "SELECT restaurant_id FROM project.restaurant_info WHERE name = ?"
        var name = request.body.name;
        db.query(getrestid, name, function(error, result) {
            if(error) {
                throw error;
            }
            else {
                var updateRestaurantInfo = "UPDATE project.restaurant_info SET name = ?, contact_number = ?, restaurant_address = ?, image_url = ? WHERE restaurant_id = ?";
                var restid = result[0].restaurant_id;
                var newname = request.body.newname;
                var newcontact = request.body.newcontact;
                var newaddress = request.body.newaddress;
                var newimg = request.body.newimg;
                var variables = [newname, newcontact, newaddress, newimg, restid];
                db.query(updateRestaurantInfo, variables, function(error, result){
                 if (error) {
                     throw error;
                 }   
                 else {
                    msg = "Restaurant Details successfully updated";
                    console.log(result);
                    respond.json(msg);
                 }
                });
            }
        });
    } 

    deleteRestaurant(request, respond) {
        var msg = " ";
        var delres = "DELETE FROM project.restaurant_info WHERE name = ?";
        var name = request.body.name;
        db.query(delres, name, function(error, result){
            if (error) {
                throw error;
            }
            else {
                msg = "Restaurant has been successfully deleted";
                console.log(result);
                respond.json(msg);
            }
        })
    }

    addOpeningHours(request, respond) {
        var msg = " ";
        var name = request.body.name;
        var getrestid = "SELECT restaurant_id FROM project.restaurant_info WHERE name = ?"
       
        db.query(getrestid, name, function(error, result){
            if (error) {
                throw error;
            }
            else {
                var x = result[0].restaurant_id;
                var sql = "INSERT INTO project.opening_hours (restaurant_id, opening_hours, day) VALUES (?, ?, ?)"
                var opening_hours = request.body.opening_hours;
                var day = request.body.day;
                var variables = [x, opening_hours, day];
                db.query(sql, variables, function(error, result){
                    console.log(variables);
                    if(error) {
                        throw error;
                    }
                    else {
                        console.log(result);
                        msg = "Opening Hours added successfully"
                        respond.json(msg);
                    }
                });
            }
        });






       
    }

    updateOpeningHours(request, respond) {
        var msg = " ";
        var getrestid = "SELECT restaurant_id FROM project.restaurant_info WHERE name = ?"
        var name = request.body.name;
        db.query(getrestid, name, function(error, result){
            if (error) {
                throw error;
            }
            else {
                var x = result[0].restaurant_id;
                var sql = "UPDATE project.opening_hours SET opening_hours = ? WHERE restaurant_id = ? AND day = ?";
                var day = request.body.day;
                var openhours = request.body.openhours;
                var variables = [openhours, x, day];
                db.query(sql, variables, function(error, result){
                    if (error) {
                        throw error;
                    }
                    else {
                        msg = "Opening Hours have been updated";
                        console.log(result);
                        respond.json(msg);
                    }
                });

                
            }
        })
    }

    addCategory(request, respond) {
        var msg = " ";
        var sql = "INSERT INTO project.categories (Category) VALUES (?)";
        var check = "SELECT Category from project.categories WHERE Category = ?";
        var catname = request.body.catname;
        db.query(check, catname, function(error, result){
            if(error) {
                throw error;
            }
            else if(result.length == 0) {
                db.query(sql, catname, function(error, result){
                    if(error) {
                        throw error;
                    }
                    else {
                        msg = "Category Successfully Added"
                        respond.json(msg);
                        console.log(result);
                    }
                });
            }
            else {
                msg = "Category already exists";
                respond.json(msg);
            }
        });
        
    }

    assignCategory(request, respond) {
        var msg = " ";
        var getrestid = "SELECT restaurant_id FROM project.restaurant_info WHERE name = ?";
        var name = request.body.name;
        db.query(getrestid, name, function(error, result){
            
            if (error) {
                throw error;
            }
            else {
                
                var x = result[0].restaurant_id;
                var getcat = "SELECT category_id FROM project.categories WHERE Category = ?";
                var catname = request.body.catname;
                db.query(getcat, catname, function(error, result){
                   
                    if (error) {
                        throw error;
                    }
                    else {
                        
                        var y = result[0].category_id;
                        var check = "SELECT restaurant_id, category_id FROM project.infocat WHERE restaurant_id = ? AND category_id = ?";
                        var variables = [x,y];
                        db.query(check, variables, function(error, result){
                            
                            console.log(result.length)
                            if (error) {
                                throw error;
                            }
                            else if (result.length == 0) {
                               
                                var sql ="INSERT INTO project.infocat (restaurant_id, category_id) VALUES (?, ?)"
                                db.query(sql, variables, function(error, result){
                                    
                                    if (error) {
                                        throw error;
                                    }
                                    else {
                                        msg = "Category Successfully Assigned";
                                        respond.json(msg);
                                    }
                                })
                            }
                            else {
                                msg = "Category is already assigned";
                                respond.json(msg);
                            }
                        });
                    }
                });
            }
        });
    }

    removeCategory(request, respond) {
        var msg = " ";
        var getrestid = "SELECT restaurant_id FROM project.restaurant_info WHERE name = ?";
        var name = request.body.name;
        db.query(getrestid, name, function(error, result){
            if(error) {
                throw error;
            }
            else {
                var x = result[0].restaurant_id;
                var getcat = "SELECT category_id FROM project.categories WHERE Category = ?";
                var catname = request.body.catname;
                db.query(getcat, catname, function(error, result){
                    if (error) {
                        throw error;
                    }
                    else {
                        var y = result[0].category_id;
                        var sql = "DELETE FROM project.infocat WHERE restaurant_id = ? AND category_id = ?";
                        var variables = [x, y];
                        db.query(sql, variables, function(error, result){
                            if (error) {
                                throw error;
                            }
                            else {
                                msg = "Category successfully removed from restaurant";
                                console.log(result);
                                respond.json(msg);
                            }
                        });
                    }
                });
                
            }
        });
    }

    search(request, respond) {
        var chinese = request.body.chinese;
        var halal = request.body.halal;
        var indian = request.body.indian;
        var malay = request.body.malay;
        var searchname = request.body.searchname;
        var sql = "SELECT project.restaurant_info.name FROM ((project.infocat INNER JOIN project.categories ON infocat.category_id = categories.category_id) INNER JOIN project.restaurant_info ON infocat.restaurant_id = restaurant_info.restaurant_id) WHERE restaurant_info.name LIKE '%' ? '%'";

        if (chinese == 1) {
            sql += "AND project.categories.Category = 'Chinese'";
        }

        if (halal == 1) {
            sql += "AND project.categories.Category = 'Halal'";
        }

        if (indian == 1) {
            sql += "AND project.categories.Category = 'Indian'";
        }

        if (malay == 1) {
            sql += "AND project.categories.Category = 'Malay'";
        }

        console.log(sql);
        db.query(sql,searchname, function(error, result){
            if (error) {
                throw error;
            }

            else {
                respond.json(result);
            }
        });

        

    }

    displayRestaurant(request, respond) {
        var name = request.body.name;
        var getrestid = "SELECT restaurant_id FROM project.restaurant_info where name = ?"
       
       
       
        db.query(getrestid, name, function(error, result){
            console.log("Query: get restaurant id")
            if (error) {
                throw error;
            }
            else {
                var restid = result[0].restaurant_id;
                var sql = "SELECT Category FROM project.categories WHERE category_id IN (SELECT infocat.category_id FROM project.infocat WHERE infocat.restaurant_id = ?)";
                db.query(sql, restid, function(error, result){
                    console.log("Query: get Categories")
                    if (error) {
                        throw error;
                    }
                    else {
                        var sql2 = "SELECT restaurant_info.name, restaurant_info.contact_number, restaurant_info.restaurant_address, restaurant_info.image_url, restaurant_info.average_rating FROM project.restaurant_info WHERE restaurant_info.restaurant_id = ?";
                        var catresult = result;
                        console.log(catresult)
                        db.query(sql2, restid, function(error, result) {
                            console.log("query: get restaurant info")
                            if (error) {
                                throw error;
                            }
                            else {
                                var restinfo = result;
                                var sql3 = "SELECT opening_hours, day FROM project.opening_hours WHERE restaurant_id = ?";
                                db.query(sql3, restid, function(error, result){
                                    console.log("query: get opening hours")
                                    if (error) {
                                        throw error;
                                    }
                                    else {
                                        var openhours = result;
                                        var finalresult = [catresult, restinfo, openhours];
                                        respond.json(finalresult);
                                    }
                                });
                            }
                            
                            
                        });
                    }
                });
            }
        });
    }

        


}

module.exports = RestaurantDB
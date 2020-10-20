function addRestaurant() {
    console.log("test1")

    //retrieve all data from Restaurant.html
    var restaurant = new Object();
    //note that we are retrieving all elements using Id, Important: ID SHOULD ALWAYS BE UNIQUE
    restaurant.name = document.getElementById("inputrestname").value;
    restaurant.contact_number = document.getElementById("inputcontactnumber").value;
    restaurant.restaurant_address = document.getElementById("inputrestaddress").value;
    restaurant.image_url = document.querySelector(".image-url").value;
    console.log(restaurant.name);
    console.log(restaurant.restaurant_address);
    console.log(restaurant.contact_number);

    var addRestaurant = new XMLHttpRequest();
    addRestaurant.open("POST", "/addrestaurant", true);
    addRestaurant.setRequestHeader("Content-Type", "application/json");
    addRestaurant.onload = function () {
        //display successful inserted message 
        addOpeningHours();
        console.log("bruh")
    };
    addRestaurant.send(JSON.stringify(restaurant));
}

function addOpeningHours() {
    console.log("test2");

    var openinghours = new Object();
    list = [document.getElementById("inputmonday").value, document.getElementById("inputtuesday").value, document.getElementById("inputwednesday").value, document.getElementById("inputthursday").value, document.getElementById("inputfriday").value, document.getElementById("inputsaturday").value, document.getElementById("inputsunday").value];
    console.log(list)
    day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    for (var i = 0; i < 7; i++) {
        openinghours.name = document.getElementById("inputrestname").value;
        openinghours.day = day[i];
        openinghours.opening_hours = list[i];
        console.log(openinghours.name);
        console.log(openinghours.day);
        console.log(openinghours.opening_hours);
        console.log(i)

        var addOH = new XMLHttpRequest();
        addOH.open("POST", "/addopeninghours", true);
        addOH.setRequestHeader("Content-Type", "application/json");
        addOH.onload = function () {
            
            if (i == 7) {
                console.log("bruhtest1")
                
            }
        }
        addOH.send(JSON.stringify(openinghours));
    }
    addCategory();
}

function addCategory() {
    console.log("test3");

    var addcat = new Object();
    var catlist = [];
    if (document.getElementById("chinese").checked == true) {
        catlist.push(document.getElementById("chinese").value)
    }
    if (document.getElementById("halal").checked == true) {
        catlist.push(document.getElementById("halal").value)
    }
    if (document.getElementById("malay").checked == true) {
        catlist.push(document.getElementById("malay").value)
    }
    if (document.getElementById("indian").checked == true) {
        catlist.push(document.getElementById("indian").value)
    }
    if (document.getElementById("japanese").checked == true) {
        catlist.push(document.getElementById("japanese").value)
    }
    if (document.getElementById("korean").checked == true) {
        catlist.push(document.getElementById("korean").value)
    }
    if (document.getElementById("western").checked == true) {
        catlist.push(document.getElementById("western").value)
    }
    if (document.getElementById("italian").checked == true) {
        catlist.push(document.getElementById("italian").value)
    }
    if (document.getElementById("local").checked == true) {
        catlist.push(document.getElementById("local").value)
    }
    if (document.getElementById("thai").checked == true) {
        catlist.push(document.getElementById("thai").value)
    }
    console.log(catlist)
    for (var x = 0; x < catlist.length; x++) {
        addcat.name = document.getElementById("inputrestname").value;
        addcat.catname = catlist[x];
        var addCat = new XMLHttpRequest();
        console.log(x)
        console.log(catlist.length)
        addCat.open("POST", "/assigncategory", true);
        addCat.setRequestHeader("Content-Type", "application/json");
        addCat.onload = function () {
            
            if (x == (catlist.length)) {
                console.log("Redirect should work")
                
            }

        }
        addCat.send(JSON.stringify(addcat));
    }
    redirect();






    //display successful inserted message 



}

function redirect() {
    console.log("bruh");
    alert("Restaurant Successfully Created");
    window.location.href = "/home.html";
}

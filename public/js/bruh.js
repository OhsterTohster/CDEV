

//function to call restaurantDB list all restaurants API
function getAllCategories() {

  //Create a GET Request to the URL /restaurant’
  var request = new XMLHttpRequest();
  request.open("GET", "/getallcategories", true);
  request.setRequestHeader("Content-Type", "application/json");
  //On retrieved of data from backend, initialize the value into restaurant_array and call the function 
  request.onload = function () {
    //retrieve response from API and parse the data into restaurant_array (intialized in app.js)
    catarray = JSON.parse(request.responseText);
    displayFilterCell();
    //call displaySearchRestaurant function
  };
  request.send();
}

function createFilterCell() {
  var filtercelllist = [];
  var cattcell = '<li>' +
  '<input class="catbutton" type="radio" name="radios" id="Default" value="0"><label class="category-label" for="Default">No Filter</label></li>';
  filtercelllist.push(cattcell);
  
  for (var i = 0; i<catarray.length; i++) {
    var catname = catarray[i].Category;
    var newi = i+1;
    var catcell = 
    '<li>' +
    '<input class="catbutton" type="radio" name="radios" id="' + catname + '" value="' + newi + '"><label class="category-label"' +
      'for="' + catname + '">' + catname + '</label>' +
    '</li>';
    filtercelllist.push(catcell);
  }
  return filtercelllist
}

function displayFilterCell() {
  var c = createFilterCell();

  for (var i = 0; i < c.length; i++) {
    var table = document.getElementById('filter');

    //Insert the HTML into restaurantTable div innerHTML
    //DOM manipulation to insert HTML into Restaurant.html
    table.insertAdjacentHTML('beforeEnd', c[i]);
  };
}

function search() {
  var search = new Object()
  //Retrieve search term from Restaurant.html of element with id= searchTerm
  search.searchname = document.getElementById('table_filter').value;
 
  var smt = document.getElementsByClassName("catbutton");
  for(var i=0; i<catarray.length +1;i++) {
    if (smt[i].checked) {
      search.cat = smt[i].value;
    }
  }
  



  //Create a GET Request to the URL ‘searchRestaurant/name’
  var request = new XMLHttpRequest();
  request.open("POST", "/search", true);
  request.setRequestHeader("Content-Type", "application/json");
  //On retrieved of data from backend, initialize the value into restaurant_array and call the function 
  request.onload = function () {
    //retrieve response from API and parse the data into restaurant_array (intialized in app.js)
    restaurant_array = formatRestaurantArray(JSON.parse(request.responseText));
    console.log(restaurant_array);
    //restaurant_array = JSON.parse(request.responseText);
    //call displaySearchRestaurant function
    displaySearchRestaurant();
  };
  request.send(JSON.stringify(search));
}

function formatRestaurantArray(raw) {
  //Function to remove duplicate restaurant entries
  var modified = [];
  modified.push(raw[0]);
  //Append the first restaurant
  for (var i = 1; i < raw.length; i++) {
      //For every entry in the original array
      var dupe = false
      for (var j = 0; j < modified.length; j++) {
          //Check if it is already existing in the modified array before appending
          if (raw[i].name == modified[j].name) {
              dupe = true;
              break;
          }
      }
      if (dupe == false) {
          //Only append if it is not a duplicate entry
          modified.push(raw[i]);
      }
  }
  return modified
}


//function to display search restaurant using data from restaurant_array
function displaySearchRestaurant() {
  //retrieve empty table element from Restaurant.html
  var table = document.getElementById('restaurantTable');
  //empty the table if there are any existing restaurants showing
  table.innerHTML = '';
  //loop through all restaurant information inside restaurant_array
  for (var i = 0; i < restaurant_array.length; i++) {
    //Call function formHTMLforDisplay and parse in each restaurant from array
    var cell = formHTMLforDisplay(restaurant_array[i]);
    //Insert the HTML into restaurantTable div innerHTML
    //DOM manipulation to insert HTML into Restaurant.html
    table.insertAdjacentHTML('beforeEnd', cell);
  }
}

//Function to create the HTML display for 1 restaurant object retrieved from database
//This function can be reuse for every restaurants retrieve from database
function formHTMLforDisplay(restaurant_info) {
  var restaurantName = restaurant_info.name;
  var restaurantUrl = restaurant_info.image_url;
  var restaurantId = restaurant_info.restaurant_id;

  
  var id = "/restaurant.html?restaurant_id=" + restaurantId;

  //html to be inserted into the table stated in the previous function
  var cell =

    '<div class="col-md-3">' +
    '<div class="row">' + '<p class="restname" onclick="openRestaurantDetails(' + '\'' + restaurantId + '\')">' + restaurantName + '</p>' + '</div>' +
    '<div class="row">' + '<a href="' + id + '">' + '<img src="' + restaurantUrl + '" class="resultimg">' + '</a>' +
    '</div>'



  return cell;
}

// //testing onclick function for html manipulation, we can perform function here to open up restaurant detail page or other modals
function openRestaurantDetails(restaurantId) {
  //window.location.href = "restaurant.html";
  localStorage.setItem("restaurantID", restaurantId);

}

//function to toggle the add new restaurant modal
function addNewRestaurant() {
  //ensure restaurant modal id equals to newRestaurantModal
  var m = document.getElementById("newRestaurantModal");
  if (m.style.display == "contents") {
    m.style.display = "none";
  } else {
    m.style.display = "contents";
  }
}

//function to retrieve user input and call restaurantDB's add restaurant function
function addRestaurant1() {
  //retrieve all data from Restaurant.html
  var restaurant = new Object();
  //note that we are retrieving all elements using Id, Important: ID SHOULD ALWAYS BE UNIQUE
  restaurant.restaurant_name = document.getElementById("name").value;
  restaurant.restaurant_description = document.getElementById("description").value;
  var location_element = document.getElementById("location");
  restaurant.restaurant_location = location_element.options[location_element.selectedIndex].value;

  //perform POST request to URL “/addRestaurant with the created object restaurant
  var addRestaurant = new XMLHttpRequest();
  addRestaurant.open("POST", "/addRestaurant", true);
  addRestaurant.setRequestHeader("Content-Type", "application/json");
  addRestaurant.onload = function () {
    //display successful inserted message 
    window.location.href = "/restaurant.html"
  }
  addRestaurant.send(JSON.stringify(restaurant));
}

//function to display restaurant info on restaurant page
function getRestaurantInfo() {
  //Create a GET Request to the URL ‘searchRestaurant/name’
  var restaurant = new Object();
  var id = getUrlVars();
  restaurant.restid = id["restaurant_id"];
  var request = new XMLHttpRequest();
  request.open("POST", "/displayrestaurant", true);
  request.setRequestHeader("Content-Type", "application/json");
  //On retrieved of data from backend, initialize the value into restaurant_array and call the function 
  request.onload = function () {
    //retrieve response from API and parse the data into restaurant_array (intialized in app.js)
    restaurant_array = JSON.parse(request.responseText);
    //call displaySearchRestaurant function
    updateRatings();
    displayRestaurant();
  };
  request.send(JSON.stringify(restaurant));

}
function getUrlVars() {
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

function displayRestaurant() {
  var restaurantname = restaurant_array[1][0].name;
  var restaurantnumber = restaurant_array[1][0].contact_number;
  var restaurantaddress = restaurant_array[1][0].restaurant_address;
  var imageurl = restaurant_array[1][0].image_url;
  var averagerating = restaurant_array[1][0].average_rating;
  var categories = restaurant_array[0];
  var openinghours = restaurant_array[2];
  var celllist = displayCategory();

  for (var i = 0; i < categories.length; i++) {
    var table = document.getElementById('restcat');

    //Insert the HTML into restaurantTable div innerHTML
    //DOM manipulation to insert HTML into Restaurant.html
    table.insertAdjacentHTML('beforeEnd', celllist[i]);
  };

  document.getElementById("restname").innerHTML = restaurantname;
  document.getElementById("avgrating").innerHTML = averagerating + ' / 10';
  document.getElementById("restpic").innerHTML = imageurl;
  document.getElementById("restaddress").innerHTML = restaurantaddress;
  document.getElementById("restnumber").innerHTML = restaurantnumber;
  document.getElementById("monday").innerHTML = openinghours[0].opening_hours;
  document.getElementById("tuesday").innerHTML = openinghours[1].opening_hours;
  document.getElementById("wednesday").innerHTML = openinghours[2].opening_hours;
  document.getElementById("thursday").innerHTML = openinghours[3].opening_hours;
  document.getElementById("friday").innerHTML = openinghours[4].opening_hours;
  document.getElementById("saturday").innerHTML = openinghours[5].opening_hours;
  document.getElementById("sunday").innerHTML = openinghours[6].opening_hours;
  document.getElementById("restpic").src = imageurl;
}


function displayCategory() {
  var categories = restaurant_array[0];
  var celllist = []

  for (var i = 0; i < categories.length; i++) {
    var x = categories[i].Category;
    var cell = '<li>' + x + '</li>';
    celllist.push(cell);

  }
  return celllist;
}

function addReview() {
  //Create a GET Request to the URL ‘searchRestaurant/name’
  var review = new Object();
  var id = getUrlVars();
  review.restaurant_id = id["restaurant_id"];
  review.userid = sessionStorage.getItem("userid");
  review.rating = document.getElementById("revrating").value;
  console.log(review.rating);
  review.review_text = document.getElementById("reviewtext").value;
  review.pictureurl = document.querySelector(".image-url").value;
 


  var request = new XMLHttpRequest();
  request.open("POST", "/addreview", true);
  request.setRequestHeader("Content-Type", "application/json");
  //On retrieved of data from backend, initialize the value into restaurant_array and call the function 
  request.onload = function () {
    //retrieve response from API and parse the data into restaurant_array (intialized in app.js)
    result = JSON.parse(request.responseText);
    //call displaySearchRestaurant function
    alert("Review successfully posted!");
    updateRatings();
    location.reload();
  };
  request.send(JSON.stringify(review));
  
}

function getRestaurantReview() {
  var lol = new Object();
  var id = getUrlVars();
  lol.restid = id["restaurant_id"];

  var request = new XMLHttpRequest();
  request.open("POST", "/selectrestaurantreview", true);
  request.setRequestHeader("Content-Type", "application/json");
  //On retrieved of data from backend, initialize the value into restaurant_array and call the function 
  request.onload = function () {
    //retrieve response from API and parse the data into restaurant_array (intialized in app.js)
    result = JSON.parse(request.responseText);
    //call displaySearchRestaurant function
    //add the function here
    displayReview();

  };
  request.send(JSON.stringify(lol));

}


function makeReviewCell() {

  var reviewcells = [];
  for (var i = 0; i < result.length; i++) {




    var image = result[i].profile_url;
    var rating = result[i].rating;

    var reviewtext = result[i].review_text;

    var reviewimg = result[i].pictureurl;
    var username = result[i].username;

    var cell = '<div id="" class="container test">' +
    '<div class="row">' +
    '<div class="col-md-2 test">' +
    '<img class="profilepic" src="' + image + '" alt="">' +
    '</div>' +
    '<div class="col-md-10 username test">' +
    '<dl class="row mt-4 mb-4 pb-3, white">' +
    '<dt class="col-sm-6">' + username + '</dt>' +
    '<dd class="col-sm-6">' + rating + '/10</dd>' +
    '</dl>' +
    '</div>' +
    '</div>' +
    '<div class="row">' +
    '<div class="col-md-6">' +
    '<p>' + reviewtext + '</p>' +
    '</div>' +
    '<div class="col-md-6">' +
    '<img class="smolreviewimg" src="' + reviewimg + '">' +
    '</div>' +
    '</div>' +
    '</div>'


   
    reviewcells.push(cell);
  }
  return reviewcells


}

function displayReview() {

  //loop through all restaurant information inside restaurant_array
  var x = makeReviewCell();
  for (var i = 0; i < x.length; i++) {
    var table = document.getElementById('reviewTable');
    var cell = x[i];
    //Insert the HTML into restaurantTable div innerHTML
    //DOM manipulation to insert HTML into Restaurant.html
    table.insertAdjacentHTML('beforeEnd', cell);
  };
}

function hideAddReview()
 {
  var a = document.getElementById("addreview-tab");
  var checklogin = sessionStorage.getItem("login");
  if (checklogin == "yes") {
    a.style.display = "block";
    
  } 
  else {
    a.style.display = "none";
  }
  
 }

 function updateRatings() {
  var restaurant = getUrlVars();
  //Create a PUT Request to the URL /updaterating/:restaurant
  var up = new Object();
  up.restaurant = restaurant["restaurant_id"]
  var request = new XMLHttpRequest();
  request.open("PUT", "/updaterating", true);
  request.setRequestHeader("Content-Type", "application/json");
  //On retrieved of data from backend, initialize the value into review_array and call the function 
  // request.onload = function () {
  // };
  request.send(JSON.stringify(up));
 }
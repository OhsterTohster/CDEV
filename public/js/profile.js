function getUserInfo() {
  var profile = new Object();
  profile.userid = sessionStorage.getItem("userid");
  var request = new XMLHttpRequest();
  request.open("POST", "/getUserInfo", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function () {
    result = JSON.parse(request.responseText);
    //call displaySearchRestaurant function
    displayProfile();
    setUserInfo();
    console.log(result);
  };
  request.send(JSON.stringify(profile));

}


function displayProfile() {
  console.log(result)

  document.getElementById("pname").innerHTML = result[0].full_name;
  document.getElementById("pgender").innerHTML = result[0].gender;
  document.getElementById("pnumber").innerHTML = result[0].mobile_number;
  document.getElementById("paddress1").innerHTML = result[0].address_line_1;
  document.getElementById("paddress2").innerHTML = result[0].address_line_2;
  document.getElementById("pcode").innerHTML = result[0].postal_code;
  document.getElementById("pusername").innerHTML = result[0].username;
  document.getElementById("pimg").src = result[0].profile_url;
  document.getElementById("pemail").innerHTML = result[0].email;



}
function getUserReview() {
  var review = new Object();
  review.userid = sessionStorage.getItem("userid");
  var request = new XMLHttpRequest();
  request.open("POST", "/getuserreview", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function () {
    reviewresult = JSON.parse(request.responseText);
    //call displaySearchRestaurant function
    displayUserReviews();
    console.log(reviewresult);
  };
  request.send(JSON.stringify(review));
}

function createCell() {
  var celllist = [];
  for (var i = 0; i < reviewresult.length; i++) {
    var restname = reviewresult[i].name;
    var restrating = reviewresult[i].rating;
    var restreviewtext = reviewresult[i].review_text;
    var reviewdate = reviewresult[i].datetime;
    var reviewid = reviewresult[i].review_id;
    var cell =
      '<dt class="col-sm-3">Restaurant:</dt>' +
      '<dd class="col-sm-9">' + restname + '</dd>' +

      '<dt class="col-sm-3">Rating:</dt>' +
      '<dd class="col-sm-9">' + restrating + '/10' + '</dd>' +

      '<dt class="col-sm-3">Review Text</dt>' +
      '<dd class="col-sm-9">' + restreviewtext + '</dd>' +

      '<dt class="col-sm-3">Date</dt>' +
      '<dd class="col-sm-9">' + reviewdate + '</dd>' +

      '<dt class="col-sm-3">Review ID</dt>' +
      '<dd id="reviewidtest" class="col-sm-9">' + reviewid + '</dd>' +

      '<dt class="col-sm-3">Delete Review</dt>' +
      '<dd class="col-sm-9"><a data-toggle="modal" data-target="#delrev">Click here</a></dd>' +

      '<br>' + '<br>' + '<br>' + '<br>'
    celllist.push(cell);

  }
  return celllist
}

function displayUserReviews() {
  var x = createCell();
  for (var i = 0; i < x.length; i++) {
    var table = document.getElementById('userReviewTable');
    var cell = x[i];
    //Insert the HTML into restaurantTable div innerHTML
    //DOM manipulation to insert HTML into Restaurant.html
    table.insertAdjacentHTML('beforeEnd', cell);
  }
}

function setUserInfo() {
  var editname = result[0].full_name;
  var editgender = result[0].gender;
  var editnumber = result[0].mobile_number;
  var edital1 = result[0].address_line_1;
  var edital2 = result[0].address_line_2;
  var editpostal = result[0].postal_code;
  var editusername = result[0].username;
  var editemail = result[0].email;
  document.getElementById("editname").value = editname;
  document.getElementById("editusername").value = editusername;
  document.getElementById("editgender").value = editgender;
  document.getElementById("edital1").value = edital1;
  document.getElementById("edital2").value = edital2;
  document.getElementById("editname").value = editname;
  document.getElementById("editpostal").value = editpostal;
  document.getElementById("editemail").value = editemail;
  document.getElementById("editnumber").value = editnumber;





}

function editUserInfo() {
  var edituser = new Object();
  edituser.username = document.getElementById("editusername").value;
  edituser.userid = sessionStorage.getItem("userid");
  edituser.email = document.getElementById("editemail").value;
  edituser.gender = document.getElementById("editgender").value;
  edituser.full_name = document.getElementById("editname").value;
  edituser.mobile_number = document.getElementById("editnumber").value;
  edituser.address_line_1 = document.getElementById("edital1").value;
  edituser.address_line_2 = document.getElementById("edital2").value;
  edituser.postal_code = document.getElementById("editpostal").value;

  var request = new XMLHttpRequest();
  request.open("PUT", "/edituserinfo", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function () {
    edituserresult = JSON.parse(request.responseText);
    console.log(edituserresult);
    alert(edituserresult);
    location.reload();

  };
  request.send(JSON.stringify(edituser));
}

function editProfilePicture() {
  var pp = new Object();
  pp.url = document.querySelector(".image-url").value;
  console.log(pp.url);
  pp.userid = sessionStorage.getItem("userid");
  var request = new XMLHttpRequest();
  request.open("PUT", "/editprofilepicture", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function () {
    editprofileresult = JSON.parse(request.responseText);
    console.log(editprofileresult);
    alert(editprofileresult);
    sessionStorage.setItem("profilepic", pp.url);
    location.reload();

  };
  request.send(JSON.stringify(pp));

}

function changePassword() {
  var pw = new Object();
  pw.userid = sessionStorage.getItem("userid");
  pw.password = document.getElementById("cfmnewpw").value;
  if (document.getElementById("newpw").value == document.getElementById("cfmnewpw").value) {
    var request = new XMLHttpRequest();
    request.open("PUT", "/changepassword", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
      changepwresult = JSON.parse(request.responseText);
      console.log(changepwresult);
      alert(changepwresult);
      location.reload();

    };
    request.send(JSON.stringify(pw));
  }
  else {
    alert("Passwords do not match, please try again")
  }
}


function sendDeactivateCode() {
  var deacode = new Object();
  deacode.email = sessionStorage.getItem("email");
  deacode.subject = "Account Deactivation Code"
  var request = new XMLHttpRequest();
  request.open("POST", "/code", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function () {
    code = JSON.parse(request.responseText);
    console.log(code);
    
    alert("Deactivation Code has been sent to your email address.");

  };
  request.send(JSON.stringify(deacode));
}

function verifyDeactivateCode() {
  var inputcode = document.getElementById("verification").value;
  if (code == inputcode) {
    var deac = new Object();
    deac.email = sessionStorage.getItem("email");
    deac.password = document.getElementById("verificationpassword").value;
    var request = new XMLHttpRequest();
    request.open("POST", "/deactivate", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
      deacresult = JSON.parse(request.responseText);
      alert(deacresult);
      logOut();

      
  
    };
    request.send(JSON.stringify(deac));
  }
  else {
    alert("Invalid Code")
  }
}

function deleteReview() {
  var del = new Object();
  del.reviewid = document.getElementById("revidinput").value;
  var request = new XMLHttpRequest();
  request.open("DELETE", "/deletereview", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function () {
    delrevresult = JSON.parse(request.responseText);
    alert(delrevresult);
    location.reload();

    

  };
  request.send(JSON.stringify(del));

  console.log(del.review_id)

}


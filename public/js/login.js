function checkLogin() {
    var login = new Object();
    login.email = document.getElementById("inputEmail").value;
    login.password = document.getElementById("inputPassword").value;
    console.log(login.email);
    console.log(login.password);
    var request = new XMLHttpRequest();
    request.open("POST", "/userlogin", true);
    request.setRequestHeader("Content-Type", "application/json");
    //On retrieved of data from backend, initialize the value into restaurant_array and call the function 
    request.onload = function () {
        //retrieve response from API and parse the data into restaurant_array (intialized in app.js)
        account_details = JSON.parse(request.responseText);
        //call displaySearchRestaurant function
        authenticateLogin(account_details);
    };
    request.send(JSON.stringify(login));

}

function authenticateLogin(account_details) {
    var values = account_details[0];
    var activated = values.activated;
    var email = values.email;
    var userid = values.userid;
    var password = values.password;
    var username = values.username;
    var profilepic = values.profile_url;
    var inputemail = document.getElementById("inputEmail").value;
    var inputpassword = document.getElementById("inputPassword").value;
    console.log(values)
    console.log("This is inputemail:" + inputemail);
    console.log("This is email:" + email);
    console.log("This is inputpassword:" + inputpassword);
    console.log("This is password:" + password);
    console.log("This is activated:" + activated);
    if (inputemail == email && inputpassword == password && activated == 1) {
        sessionStorage.setItem("userid", userid);
        sessionStorage.setItem("email", email)
        sessionStorage.setItem("login", "yes");
        sessionStorage.setItem("profilepic", profilepic);
        alert("Welcome " + username);
        window.location.href = "home.html";
    }
    else {
        if (inputemail != email || password != inputpassword) {
            alert("Invalid login credentials");
        }
        else if (activated != 1) {
            alert("Account is currently deactivated")
        }
        else {
            alert("User not found")
        }


    }


}

function logOut() {
    sessionStorage.removeItem("userid");
    sessionStorage.removeItem("email")
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("profilepic");
    window.location.href = "home.html";
}

function yesLogin() {
    var x = document.getElementById("login");
    var y = document.getElementById("logout");
    var z = document.getElementById("profile");
    var img = sessionStorage.getItem("profilepic");


    if (x !== null) {
        console.log("yes");
    }

    else {
        console.log("no");
    }
    var check = sessionStorage.getItem("login");

    if (check == "yes") {
        x.style.display = "none";
        y.style.display = "block";
        z.style.display = "block";
        document.getElementById("profilepic").src = img;


    }
    else {
        x.style.display = "block";
        y.style.display = "none";
        z.style.display = "none";

    }
}

function forgotPassword() {
    var forgotpass = new Object();
    forgotpass.email = document.getElementById("forgotpwemail").value;
    console.log(forgotpass.email)
    var request = new XMLHttpRequest();
    request.open("POST", "/forgotpassword", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        pwresponse = JSON.parse(request.responseText);
        alert(pwresponse);
        location.reload();

    };
    request.send(JSON.stringify(forgotpass));

}

function sendActivateCode() {
    var actcode = new Object();
    actcode.email = document.getElementById("activateemail").value;
    actcode.subject = "Account Reactivation Code"
    var request = new XMLHttpRequest();
    request.open("POST", "/code", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        acticode = JSON.parse(request.responseText);
        console.log(acticode);
        alert("Reactivation Code has been sent to your email address.");

    };
    request.send(JSON.stringify(actcode));
}


function activateAccount() {
    var inputcode = document.getElementById("activatecode").value;
    console.log(acticode);
    console.log(inputcode);
    if (acticode == inputcode) {
        var act = new Object();
        act.email = document.getElementById("activateemail").value;
        var request = new XMLHttpRequest();
        request.open("POST", "/reactivate", true);
        request.setRequestHeader("Content-Type", "application/json");
        request.onload = function () {
            actresponse = JSON.parse(request.responseText);
            alert(actresponse);
            location.reload();

        };
        request.send(JSON.stringify(act));
    }
    else {
        alert("Invalid Code")
    }
}
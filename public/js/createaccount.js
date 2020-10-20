function showPassword() {
  var x = document.getElementById("inputPassword");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

$(document).ready(function ($) {
  $('#inputPassword').strength({
    strengthClass: 'strength',
    strengthMeterClass: 'strength_meter',
  });
});


var captcha = false;
  var onloadCallback = function () {
    grecaptcha.render('html_element', {
      'sitekey': '6LfCnsgUAAAAANhmZbPWU3DCyf8DDEs2Trb2XbpH',
      'callback': correctCaptcha
    });
  };
  var correctCaptcha = function (response) {
    validate();
  };
  function validate() {
    captcha = true;
  }


function createAccount() {
  if (!captcha) {
    alert("Captcha not filled")
  }
  else {
    var account = new Object();
    account.username = document.getElementById("inputUsername").value;
    account.full_name = document.getElementById("inputName").value;
    account.email = document.getElementById("inputEmail").value;
    account.password = document.getElementById("inputPassword").value;
    account.mobile_number = document.getElementById("inputNumber").value;
    account.address_line_1 = document.getElementById("inputAddress1").value;
    account.address_line_2 = document.getElementById("inputAddress2").value;
    account.gender = document.getElementById("inputGender").value;
    account.postal_code = document.getElementById("inputPostalCode").value;
    console.log(account);
    //perform POST request to URL “/addRestaurant with the created object restaurant
    var addUser = new XMLHttpRequest();
    addUser.open("POST", "/createaccount", true);
    addUser.setRequestHeader("Content-Type", "application/json");
    addUser.onload = function () {
      //display successful inserted message 
      alert("Account Successfully Created");
      window.location.href = "/home.html"
    }
    addUser.send(JSON.stringify(account));
  }

}


"use strict"
var db = require('../db-connection');
const AccountDetails = require('./AccountDetails')
var testvar = 1

class AccountDetailsDB {
    
    userLogin(request, respond) {
        var email = request.body.email;
        var password = request.body.password;
        var sql = "SELECT account_details.activated , account_details.email, password.password FROM project.account_details INNER JOIN project.password ON account_details.userid = password.userid WHERE email = ? ";
        db.query(sql, [email], function (error, result) {

            if (error) {
                throw error;
            }
            else if (result.length > 0) {

                if (result[0].password == password && result[0].email == email) {
                    var msg = "Login Successful!"
                    console.log(msg);
                    respond.json(msg);
                    var test = getUserInfo();
                    console.log(test);

                }
                else if (result[0].password != password && result[0].email == email) {
                    var msg = "Invalid Password"
                    console.log(msg);
                    respond.json(msg);
                }

            }
            else {
                var msg = "User not found"
                console.log(msg)
                respond.json(msg);
            }

        });
    }

    createAccount(request, respond) {
        var userObject = new AccountDetails(request.body.username, null, request.body.email, request.body.gender, request.body.full_name, request.body.mobile_number, request.body.address_line_1, request.body.address_line_2, request.body.postal_code, null, null, null, request.body.password);

        var verify = "SELECT email FROM project.account_details WHERE email = ?";
        var msg = "";

        var sql = "INSERT INTO project.account_details (username, email, gender, full_name, mobile_number, address_line_1, address_line_2, postal_code, verified, activated, profile_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, 1, 'https://cdn.discordapp.com/attachments/656394258789433344/656864237842333698/1.png')";
        var password = "INSERT INTO password (userid, password) VALUES (?, ?)";

        var values = [userObject.getUsername(), userObject.getEmail(), userObject.getGender(), userObject.getFullName(),
        userObject.getMobileNumber(), userObject.getAddress1(), userObject.getAddress2(), userObject.getPostalCode()];

        var passvalues = [userObject.getUserId(), userObject.getPassword()];

        db.query(verify, userObject.getEmail(), function (error, result) {
            if (error) {
                throw error;
            }
            else {
                if (result.length == 0) {
                    db.query(sql, values, function (error, result) {
                        if (error) {
                            throw error;
                        }
                        else {
                            db.query(password, passvalues, function (error, result) {
                                if (error) {
                                    throw error;
                                }
                                else {
                                    msg = "Success!";
                                    respond.json(msg);
                                }
                            });
                        }
                    });
                }
                else {
                    msg = "Duplicate entry";
                    respond.json(msg)
                }
            }
        });
    }

    getAllUsers(request, respond) {
        var sql = "SELECT * FROM project.account_details INNER JOIN project.password ON account_details.userid = password.userid";
        db.query(sql, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                respond.json(result)
            }
        });
    }

    forgotPassword(request, respond) {
        var email = request.body.email;
        var password = generatePassword();
        var msg = "";
        var passwordObject = new AccountDetails(null, null, email, null, null, null, null, null, null, null, null, null, password);
        var verify = "SELECT account_details.email,     account_details.userid FROM project.account_details WHERE email = ?";
        
        db.query(verify, email, function (error, result) {
            console.log(result[0].userid)
            var res = result[0].userid
            if (error) {
                throw error;
            }

            else {
                if (result.length == 0) {
                    msg = "Test Test Failed"
                    respond.json(msg);
                }
                else {
                    var variables = [password, res];
                    var sql = "UPDATE project.password SET password = ? WHERE userid = ?";
                    db.query(sql, variables, function (error, result) {
                        passwordObject.setUserId(res)
                        console.log(res)
                        if (error) {
                            throw error;
                        }
                        else {
                            msg = "Password has been emailed to your email address"
                            var nodemailer = require('nodemailer');

                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'help.niceanot@gmail.com',
                                    pass: 'GGEZ1868'
                                }
                            });

                            var mailOptions = {
                                from: 'help.niceanot@gmail.com',
                                to: email,
                                subject: 'New Password',
                                text: password
                            };

                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            });
                            respond.json(msg);
                        }

                    });
                }
            }
        })
    }

    verifyUser(request, respond) {
        var passcode = "123";
        var msg = " ";
        var email = request.body.email;
        var input = request.body.input;
        var nodemailer = require('nodemailer');
        var verifymsg = "Verification Code has been sent to your email address."
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'help.niceanot@gmail.com',
                pass: 'GGEZ1868'
            }
        });

        var mailOptions = {
            from: 'help.niceanot@gmail.com',
            to: email,
            subject: 'Verification Code',
            text: passcode
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        respond.json(verifymsg);

       if(input == passcode) {

           var sql = "UPDATE project.account_details SET verified = 1 WHERE email = ?";
           db.query(sql, email, function(error, result){    
               if(error){
                   throw error;
               }
               else {
                   msg = "Account has been successfully verified";
                   respond.json(msg);
               }
           });
       }
       else {
           msg = "Account Verification failed";
           respond.json(msg);
       }

    }

   
    

    


}
function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

function sendVerificationEmail() {

}


module.exports = AccountDetailsDB
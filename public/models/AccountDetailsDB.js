"use strict"
var db = require('../db-connection');
const AccountDetails = require('./AccountDetails')
var testvar = 1

class AccountDetailsDB {

    userLogin(request, respond) {
        var email = request.body.email;
        var password = request.body.password;
        var sql = "SELECT account_details.activated = 1 AS activated , account_details.email, account_details.username, account_details.profile_url, account_details.userid, password.password FROM project.account_details INNER JOIN project.password ON account_details.userid = password.userid WHERE email = ? ";
        db.query(sql, [email], function (error, result) {
            if (error) {
                throw error;
            }
            else if (result.length > 0) {

                if (result[0].password == password && result[0].email == email && result[0].activated == 1) {
                    var msg = "Login Successful!"
                    respond.json(result);
                }

                else if (result[0].password != password) {
                    var msg = "Invalid Password"
                    respond.json(result);
                }

                else if (result[0].activated != 1) {
                    var msg = "Account is currently Deactivated, please reactivate account to login."
                    respond.json(result);
                }

            }
            else {
                var msg = "User not found";
                respond.json(msg);
            }

        });
    }

    createAccount(request, respond) {
        var userObject = new AccountDetails(request.body.username, null, request.body.email, request.body.gender, request.body.full_name, request.body.mobile_number, request.body.address_line_1, request.body.address_line_2, request.body.postal_code, null, null, null, request.body.password);

        var verify = "SELECT userid FROM project.account_details WHERE email = ?";
        var msg = "";

        var sql = "INSERT INTO project.account_details (username, email, gender, full_name, mobile_number, address_line_1, address_line_2, postal_code, verified, activated, profile_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, 1, 'https://cdn.discordapp.com/attachments/656394258789433344/656864237842333698/1.png')";
        var password = "INSERT INTO project.password (userid, password) VALUES ((SELECT userid FROM project.account_details WHERE email = ?), ?)";

        var values = [userObject.getUsername(), userObject.getEmail(), userObject.getGender(), userObject.getFullName(),
        userObject.getMobileNumber(), userObject.getAddress1(), userObject.getAddress2(), userObject.getPostalCode()];

        var passvalues = [userObject.getEmail(), userObject.getPassword()];
        console.log(userObject);

        db.query(verify, userObject.getEmail(), function (error, result) {

            if (error) {
                throw error;
            }
            else {
                if (result.length == 0) {
                    db.query(sql, values, function (error, result) {
                        console.log("hi")
                        if (error) {
                            throw error;
                        }
                        else {
                            db.query(password, passvalues, function (error, result) {
                                console.log("hello")
                                console.log(userObject.getUserId())
                                console.log(userObject.getPassword())
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

    getUserInfo(request, respond) {
        var sql = "SELECT username, email, gender, full_name, mobile_number, address_line_1, address_line_2, postal_code, verified = 1 AS verified, profile_url FROM project.account_details WHERE userid = ?";
        var userid = request.body.userid;
        db.query(sql, userid, function (error, result) {
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
        var verify = "SELECT account_details.email, account_details.userid FROM project.account_details WHERE email = ?";
        console.log("email here");
        console.log(email);
        db.query(verify, email, function (error, result) {
            //console.log(result[0].userid)

            if (error) {
                throw error;
            }

            else {
                if (result.length == 0) {
                    msg = "User Does not exist"
                    respond.json(msg);
                }
                else {
                    var res = result[0].userid;
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
            html: '<h1>Verification Code: </h1><br>' + passcode
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            respond.json(verifymsg);
        });
        var checkemail = "SELECT email FROM project.account_details WHERE email = ?";

        db.query(checkemail, email, function (error, result) {
            console.log(result)
            if (error) {
                throw error;
            }
            else if (result.length == 1) {
                if (input == passcode) {

                    var sql = "UPDATE project.account_details SET verified = 1 WHERE email = ?";

                    db.query(sql, email, function (error, result) {
                        if (error) {
                            throw error;
                        }
                        else {
                            msg = "Account has been successfully verified";
                            respond.json(msg);
                        }
                    });
                }
                else {
                    msg = "Invalid verification code";
                    respond.json(msg);
                }

            }
            else {
                msg = "Account Verification failed";
                respond.json(msg);
            }
        });


    }

    deactivateUser(request, respond) {
        var email = request.body.email;
        var password = request.body.password;
        var variables = [email, password]
        var sql = "SELECT project.account_details.email, project.password.password FROM project.account_details INNER JOIN project.password ON project.account_details.userid = project.password.userid WHERE project.account_details.email = ? AND project.password.password = ?";
        var msg = "";
        console.log(variables);
        db.query(sql, variables, function (error, result) {
            if (error) {
                throw error;
            }
            else if (result.length == 1) {
                var deactivate = "UPDATE project.account_details SET activated = 0 WHERE email = ?"
                db.query(deactivate, email, function (error, result) {
                    if (error) {
                        throw error;
                    }
                    else {
                        msg = "Account Successfully Deactivated"
                        respond.json(msg);
                    }
                });
            }
            else {
                msg = "Account Deactivation Failed"
                respond.json(msg);
            }
        });
    }

    reactivateUser(request, respond) {
        var email = request.body.email;
        var checkemail = "SELECT email FROM project.account_details WHERE email = ?";
        var msg = '';

        db.query(checkemail, email, function (error, result) {
            console.log(result)
            if (error) {
                throw error;
            }
            else if (result.length == 1) {


                var sql = "UPDATE project.account_details SET activated = 1 WHERE email = ?";

                db.query(sql, email, function (error, result) {
                    if (error) {
                        throw error;
                    }
                    else {
                        msg = "Account has been successfully reactivated";
                        respond.json(msg);
                    }
                });


            }
            else {
                msg = "Account Reactivation failed";
                respond.json(msg);
            }
        });


    }

    editUserInfo(request, respond) {
        var msg = " ";
        var userObject = new AccountDetails(request.body.username, request.body.userid, request.body.email, request.body.gender, request.body.full_name, request.body.mobile_number, request.body.address_line_1, request.body.address_line_2, request.body.postal_code, null, null, null);
        var values = [userObject.getUsername(), userObject.getEmail(), userObject.getGender(), userObject.getFullName(),
        userObject.getMobileNumber(), userObject.getAddress1(), userObject.getAddress2(), userObject.getPostalCode(), userObject.getUserId()];
        var sql = "UPDATE project.account_details SET username = ?, email = ?, gender = ?, full_name = ?, mobile_number = ?, address_line_1 = ?, address_line_2 = ?, postal_code = ? WHERE userid = ?";
        db.query(sql, values, function (error, result) {

            if (error) {
                msg = "Error Occured"
                respond.json(msg);
                throw error;

            }
            else {
                msg = "User Details Successfully Updated"
                respond.json(msg);
            }

        });

    }

    editProfilePicture(request, respond) {
        var sql = 'UPDATE project.account_details SET profile_url = ? WHERE userid = ?';
        var url = request.body.url;
        var userid = request.body.userid;
        var values = [url, userid];
        var msg = ''
        db.query(sql, values, function (error, result) {
            if (error) {
                msg = "Failed to update profile picture"
                respond.json(msg);
                throw error;
            }
            else {
                msg = "Profile Picture Successfully Updated";
                respond.json(msg);
            }
        });
    }

    changePassword(request, respond) {
        var sql = "UPDATE project.password SET password = ? WHERE userid = ?";
        var password = request.body.password;
        var userid = request.body.userid;
        var values = [password, userid];
        var msg = '';
        db.query(sql, values, function (error, result) {
            if (error) {
                msg = "Failed to change password"
                respond.json(msg);
                throw error;
            }
            else {
                msg = "Password changed successfully";
                respond.json(msg);
            }
        });
    }
    getCode(request, respond) {
        var email = request.body.email;
        console.log(email)
        var subjectline = request.body.subject;
        var passcode = generatePassword();
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
            subject: subjectline,
            text: passcode
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            respond.json(passcode);
        });
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


module.exports = AccountDetailsDB
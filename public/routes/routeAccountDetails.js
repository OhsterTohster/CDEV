"use strict"

const AccountDetailsDB = require('../models/AccountDetailsDB');

var AccountDetailsDBObject = new AccountDetailsDB();
function routeAccountDetails(app){
    app.route('/userlogin')
            .post(AccountDetailsDBObject.userLogin);
    
    app.route('/createaccount')
            .post(AccountDetailsDBObject.createAccount);
    
    app.route('/forgotpassword')
            .post(AccountDetailsDBObject.forgotPassword);   


    app.route('/verify')
            .post(AccountDetailsDBObject.verifyUser);

}
module.exports = {routeAccountDetails};
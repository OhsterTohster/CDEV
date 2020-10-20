"use strict"

const AccountDetailsDB = require('../models/AccountDetailsDB');

var AccountDetailsDBObject = new AccountDetailsDB();
function routeAccountDetails(app) {

        app.route('/userlogin')
                .post(AccountDetailsDBObject.userLogin);

        app.route('/createaccount')
                .post(AccountDetailsDBObject.createAccount);

        app.route('/forgotpassword')
                .post(AccountDetailsDBObject.forgotPassword);

        app.route('/getUserInfo')
                .post(AccountDetailsDBObject.getUserInfo);


        app.route('/verify')
                .post(AccountDetailsDBObject.verifyUser);

        app.route('/deactivate')
                .post(AccountDetailsDBObject.deactivateUser);

        app.route('/reactivate')
                .post(AccountDetailsDBObject.reactivateUser);

        app.route('/edituserinfo')
                .put(AccountDetailsDBObject.editUserInfo);
        
        app.route('/editprofilepicture')
                .put(AccountDetailsDBObject.editProfilePicture);
        
        app.route('/changepassword')
                .put(AccountDetailsDBObject.changePassword);
        
        app.route('/code')
                .post(AccountDetailsDBObject.getCode);



}
module.exports = { routeAccountDetails };
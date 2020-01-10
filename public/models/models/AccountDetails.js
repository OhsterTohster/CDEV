"use strict";

class AccountDetails {
    constructor(username, userid, email, gender, full_name, mobile_number, address_line_1, address_line_2, postal_code, verified, activated, profile_url, password) {
        this.username = username;
        this.userid = userid;
        this.email = email;
        this.gender = gender;
        this.full_name = full_name;
        this.mobile_number = mobile_number;
        this.address_line_1 = address_line_1;
        this.address_line_2 = address_line_2;
        this.postal_code = postal_code;
        this.verified = verified;
        this.activated = activated;
        this.profile_url = profile_url;
        this.password = password;
    }
    //put the get methods here
    getUsername() {
        return this.username;
    }

    getUserId() {       
        return this.userid;
    }

    getEmail() {
        return this.email;
    }

    getGender() {
        return this.gender;
    }

    getFullName() {
        return this.full_name;
    }

    getMobileNumber() {
        return this.mobile_number;
    }

    getAddress1() {
        return this.address_line_1;
    }

    getAddress2() {
        return this.address_line_2;
    }

    getPostalCode() {
        return this.postal_code;
    }

    getVerified() {
        return this.verified;
    }

    getActivated() {
        return this.activated;
    }

    getProfileURL() {
        return this.profile_url;
    }

    getPassword() {
        return this.password;
    }
    
    setUsername(username){
        this.username = username;
    }

    setUserId(userid){
        this.userid = userid;
    }

    setEmail(email){
        this.email = email;
    }

    setGender(gender){
        this.gender = gender;
    }

    setFullName(full_name){
        this.full_name = full_name;
    }

    setMobileNumber(mobile_number){
        this.mobile_number = mobile_number;
    }

    setAddress1(address_line_1){
        this.address_line_1 = address_line_1;
    }

    setAddress2(address_line_2){
        this.address_line_2 = address_line_2;
    }

    setPostalCode(postal_code){
        this.postal_code = postal_code;
    }

    setVerified(verified){
        this.verified = verified;
    }

    setActivated(activated){
        this.activated = activated;
    }

    setProfileUrl(profile_url){
        this.profile_url = profile_url;
    }

    setPassword(password) {
        this.password = password;
    }

}
module.exports = AccountDetails;
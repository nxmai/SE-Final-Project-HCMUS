const flash = require('connect-flash');
const passport = require("passport");
const localstrategy = require("passport-local").Strategy;
const accountModel = require("../../models/accountModel");
const accoutServices = require("../../services/accountServices") 

passport.use(new localstrategy (
  async function(username,password,done)
 {
    
 }
));
 
 passport.serializeUser(function(user,done){
   
 });
 
 passport.deserializeUser(async function(id,done) 
 {
   
 });

 module.exports = passport; 
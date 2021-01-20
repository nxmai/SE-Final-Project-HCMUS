

    if(lockedCheck)
    {
      return done(null,false, {message: 'Tài khoản của bạn đã bị khoá, liên hệ chúng tôi!'})
    }
    return done(null,existUser); 
 }
));
 
 passport.serializeUser(function(user,done){
   done(null,user._id); 
 });
 
 passport.deserializeUser(async function(id,done) 
 {
   const user = await accountModel.getUserById(id); 
   done(null,user); 
 });

 module.exports = passport; 
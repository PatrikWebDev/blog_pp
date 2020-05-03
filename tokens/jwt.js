const fs   = require('fs');
const jwt   = require('jsonwebtoken');

// use 'utf8' to get string instead of byte array  (512 bit key)
const privateKEY  = fs.readFileSync('./tokens/private.key', 'utf8');
const publicKEY  = fs.readFileSync('./tokens/public.key', 'utf8');

// class JWToken{
//   constructor(){
//     fs= require('fs');
//     jwt = require('jsonwebtoken');
//     privateKEY = fs.readFileSync('./private.key', 'utf8');
//     publicKEY = fs.readFileSync('./public.key', 'utf8');
//   }
//   sign(payload, Options){
//     const signOptions = {
//       issuer:  "PatrikBlog",
//       username:  Options.subject,
//       admin:  Options.admin,
//       superAdmin: Options.superAdmin,
//       expiresIn:  "2h",    // 2 hours validity
//       algorithm:  "RS256"    
//   };
//   return jwt.sign(payload, privateKEY, signOptions);
//   }
// }


module.exports = {
 sign: (payload) => {
  /*
   sOptions = {
    issuer: "Authorizaxtion/Resource/This server",
    subject: "iam@user.me", 
    audience: "Client_Identity" // this should be provided by client
   }
  */
  // Token signing options
  const signOptions = {
      issuer:  "PatrikBlog",
      expiresIn:  "2h",    // 2 hours validity
      algorithm:  "RS256"    
  };
  return jwt.sign(payload, privateKEY, signOptions);
},
verify: (token, options) => {
  /*
   vOption = {
    issuer: "Authorization/Resource/This server",
    subject: "iam@user.me", 
    audience: "Client_Identity" // this should be provided by client
   }  
  */
  const verifyOptions = {
    issuer:  "PatrikBlog",
    expiresIn:  "2h",
    algorithm:  ["RS256"]
  };
   try{
     return jwt.verify(token, publicKEY, verifyOptions);
   }catch (err){
     return false;
   }
},
 decode: (token) => {
    return jwt.decode(token, {complete: true});
    //returns null if token is invalid
 }
}
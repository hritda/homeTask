const UserToken = require('../models/UserToken');


const isAuthenticated = async (req, res, next) => {
    // Check if user is logged in (you can implement your own logic here)
   // console.log(req.headers);
    const authHeader = req.headers['authorization'];
    //console.log(authHeader);
   if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized!' });
    }
    const userToken = await UserToken.findOne({token: authHeader});
    if(!userToken){
        return res.status(401).json({ error: 'Invalid token' });
    }
    if(userToken.is_active == 0){
      return res.status(401).json({ error: 'session expired! please login again' });
    }
    const user = userToken.user ;
    req.user = user ;
      next();
    };
  
  module.exports = isAuthenticated;
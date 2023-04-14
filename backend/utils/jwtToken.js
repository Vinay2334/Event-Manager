// Create Token and saving in cookie
const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res) => {
    const token = jwt.sign({id:user.uid},process.env.JWT_KEY);
    // options for cookie
    const options = {
      httpOnly: true,
    };
  
    res.status(statusCode).cookie("access_token", token, options).json({
      success: true,
      user,
      token,
    });
  };
  
  module.exports = sendToken;
  
const jwt = require("jsonwebtoken");
require("dotenv").config();
const key = process.env.JWT_KEY;

module.exports = (req, res, next) => {

  const token = req.headers.authorization.split(" ")[1];
  // console.log(token);
  if (token === "undefined") {
    return res.send(false);
  }

  try {
    const decoded = jwt.verify(token, key);
    req.body.user_id = decoded.data._id;
    // console.log(req.body.user_id);
    return next();
    
  } catch (error) {
    return res.send(false);
  }
};
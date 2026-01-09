const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (decodedData) {
        req.user = decodedData.email;
        next();
      } else {
        res.status(401).json({ message: "Invalied Token , Please login" });
      }
    } else {
      res.status(401).json({ message: "Token is requied , Please login" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Somthing went wrong while validating token,please try login again",
    });
  }
};

module.exports = jwtMiddleware;

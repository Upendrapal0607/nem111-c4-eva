const jwt = require("jsonwebtoken");
const BlackList = require("../Model/BlackListModel");
const auth = async (req, res, next) => {
  // console.log(req);
  try {
    const token = req.headers.authorization;
    console.log((token));
    if (token) {
      const blacklistedToken = await BlackList.findOne({ token: token });
      if (blacklistedToken) {
        res.status(200).send({ msg: "please Login Again!" });
      } else {
        jwt.verify(token, "masai", (err, decode) => {
          console.log("decode", decode);
          if (decode) {
            req.body.userID = decode.userID;
            req.body.userName = decode.user;
            next();
          } else res.send({ message: "error" });
        });
      }
    } else {
      res.status(200).send({ message: "You are not authorized"});
    }
  } catch (error) {
    res.sent({ msg: "there is something wrong" });
  }
};

const AdminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (token) {
      const blacklistedToken = await BlackList.findOne({ token: token });
      if (blacklistedToken) {
        res.status(200).send({ msg: "please Login Again!" });
      } else {
        jwt.verify(token, "admin", (err, decode) => {
  
          if (decode) {
         
            next();
          } else res.send({ message: "error" });
        });
      }
    } else {
      res.status(200).send({ message: "You are not authorized" });
    }
  } catch (error) {
    res.sent({ msg: "there is something wrong" });
  }
};

module.exports = {
  auth,
  AdminAuth,
};

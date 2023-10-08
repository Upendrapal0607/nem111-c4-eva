const jwt = require("jsonwebtoken");
const BlackList = require("../Model/BlackListModel");
const auth = async (req, res, next) => {
  
  try {
    const token = req.headers.authorization;
    
    if (token) {
      const blacklistedToken = await BlackList.findOne({ token: token });
      // console.log({blacklistedToken})
      if (blacklistedToken) {
        res.status(200).send({ msg: "please Login Again!" });
      } else {
       
        jwt.verify(token, "masai", (err, decode) => {
      //  console.log({decode})
      if (decode) {
            //  console.log({decode},"hello decode")
            // console.logg("{decode}")
            req.body.userId = decode.userID;
            req.body.userName = decode.user;
            next();
          } else res.send({ message: "error" });
        });
      }
    } else {
      res.status(200).send({ message: "You are not authorized"});
    }
  } catch (error) {
    res.send({ message: "there is something wrong" });
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

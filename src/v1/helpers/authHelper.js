import Jwt from "jsonwebtoken";
import config from "../../../config.js";

// <---------------------------------------Generate New JWT Token---------------------------------------->
export const signJwtToken = (payload) => {
  try {
    // payload will contain _id of user table
    const { jwtKey, jwtExpire } = config;
 
    const newToken = Jwt.sign({ _id: payload }, jwtKey, {
      expiresIn: jwtExpire,
    });
    return newToken;
  } catch (error) {
    throw error;
  }
};

//<-----------------------------------------Validate JWT Token------------------------------------------->
export const verifyJwtToken = (token) => {
  try {
    const { jwtKey } = config;
    return Jwt.verify(token, jwtKey);
  } catch (error) {
    throw error;
  }
};

// <----------------------------------------Decode JWT Token--------------------------------------------->
export const decodeJwtToken = (token)=>{
  try {
    return Jwt.decode(token)
  } catch (error) {
    throw error
  }
}

import { statusCodes } from "../../../constants/statusCodes.js";
import { messages } from "../../../constants/messages.js";
import { verifyJwtToken ,decodeJwtToken} from "../helpers/authHelper.js";
import {User} from "../models/user.js"

// <------------------------------------------Authenticate User Based Of JWT------------------------------------>
export const isAuthValid = async (req, res, next) => {
  try {
    // Fetch the JWT token from client cookies
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(statusCodes.UN_AUTHORIZED).json({
        Success: false,
        messages: messages.INVALID_TOKEN,
        data: {},
      });
    }

    // Check the token is valid or not
    const isTokenValid = verifyJwtToken(token);

    if (!isTokenValid) {
      return res.status(statusCodes.UN_AUTHORIZED).json({
        Success: false,
        messages: messages.UN_AUTHORIZED,
        data: {},
      });
    }

    // Decode the valid token
    const data = decodeJwtToken(token);

    // Find the use in db
    const isUser = await User.findById({_id:data._id});

    if(!isUser){
        return res.status(statusCodes.UN_AUTHORIZED).json({
            Success: false,
            messages: messages.INVALID_USER,
            data: {},
          });
    }

    req.user = next()
  } catch (error) {
    next(error)
  }
};

import { Router } from "express";
import signInRoute from "./signIn.js";
import signUpRoute from "./signUp.js";
import signOutRoute from "./logOut.js";
import newsRoute from "./news.js";
import weatherRoute from "./weather.js";

// Use Router as router
const router = Router();

//<-----------------------------------------------Use All Available Routes in V1------------------------------------------->
router.use("/v1", signUpRoute, signInRoute, signOutRoute,newsRoute, weatherRoute);

export default router;

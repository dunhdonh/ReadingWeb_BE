import express from "express";

import authRoute from "./auth.route";
import userRoute from "./user.route";
import documentRoute from "./document.route";

const routes = express.Router();

routes.use(
  "/auth",
  authRoute,
);

routes.use(
  "/users/me",
  userRoute,
);

routes.use(
  "/documents",
  documentRoute,
);

export default routes;
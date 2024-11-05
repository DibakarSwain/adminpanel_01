const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/auth-controller");

const signupSchema = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");

const authMiddleware = require("../middlewares/auth-middleware");

router.route("/").get(authControllers.home);

// --------------------------------------------
// first validate through zod and the hit to authControllers.register
// -------------------------------------------
router
  .route("/register")
  .post(validate(signupSchema), authControllers.register);
router.route("/login").post(authControllers.login);

// here authMiddleware is for verify the user either logged in or not
router.route("/user").get(authMiddleware, authControllers.user);
module.exports = router;

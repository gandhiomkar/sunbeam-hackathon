const router = require("express").Router();
const { registerUser, loginUser } = require("../controllers/authController");

router.post(
  "/register",
  /*
#swagger.tags = ['Auth']
#swagger.summary = 'Register a user'
*/ registerUser
);

router.post(
  "/login",
  /*
#swagger.tags = ['Auth']
#swagger.summary = 'Login a user'
*/ loginUser
);

module.exports = router;

const { Router } = require("express");
const router = Router();

router.use("/signin", require('./signin')); // http://localhost:3000/signin
router.use("/signup", require('./signup')); // http://localhost:3000/signup
router.use("/quotes", require('./quotes')); // http://localhost:3000/quotes
router.use("/search", require('./search')); // http://localhost:3000/search
router.use("/users", require('./users'));   // http://localhost:3000/users

module.exports = router;

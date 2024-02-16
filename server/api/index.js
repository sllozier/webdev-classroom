const router = require("express").Router();

// "/api"
router.use("/admin", require("./admin"));
router.use("/classes", require("./classes"));
router.use("/accounts", require("./accounts"));
router.use("/modules", require("./modules"));
router.use("/auth", require("./auth"));

module.exports = router;

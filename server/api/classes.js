const router = require("express").Router();
const { Class, Announcement, Module, Account } = require("../db");
const { requireToken, isAdmin } = require("./gateKeeper");

// Class routes
//preview of all classes
router.get("/", async (req, res, next) => {
  try {
    const classes = await Class.findAll();
    res.send(classes);
  } catch (error) {
    next(error);
  }
});

//preview of single class
router.get("/:id", async (req, res, next) => {
  try {
    const singleClass = await Class.findByPk(req.params.id);
    res.send(singleClass);
  } catch (error) {
    next(error);
  }
});

//Getting modules is in modules route ------->>>>>>

// router.delete("/classes/:id", requireToken, isAdmin, async (req, res, next) => {
//   try {
//     const deletedClass = await Class.findByPk(req.params.id);
//     await deletedClass.destroy();
//     res.send(deletedClass);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;

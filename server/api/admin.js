const router = require("express").Router();
const { isAdmin, requireToken } = require("./gateKeeper");
const { Account, Class, Module, Assignment, Announcement } = require("../db");

//Admin routes
router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const adminList = await Account.findAll({
      where: {
        isAdmin: true,
      },
    });
    res.send(adminList);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", requireToken, isAdmin, async (req, res, next) => {
  try {
    const admin = await Account.findByPk(req.params.id);
    res.send(admin);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", requireToken, isAdmin, async (req, res, next) => {
  try {
    const deletedAdmin = await Account.findByPk(req.params.id);
    await deletedAdmin.destroy();
    res.send(deletedAdmin);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", requireToken, isAdmin, async (req, res, next) => {
  try {
    const updatedAdmin = await Account.findByPk(req.params.id);
    await updatedAdmin.update(req.body);
    res.send(updatedAdmin);
  } catch (error) {
    next(error);
  }
});

//Admin-User routes
router.get("/:id/accounts", requireToken, isAdmin, async (req, res, next) => {
  try {
    const accountList = await Account.findAll({
      where: {
        isAdmin: false,
      },
    });
    res.send(accountList);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id/accounts/:accountId",
  requireToken,
  isAdmin,
  async (req, res, next) => {
    try {
      const singleAccount = await Account.findByPk(req.params.accountId, {
        where: {
          isAdmin: false,
        },
        include: {
          model: Class,
        },
      });
      res.send(singleAccount);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id/accounts/:accountId",
  requireToken,
  isAdmin,
  async (req, res, next) => {
    try {
      const deletedAccount = await Account.findByPk(req.params.accountId);
      await deletedAccount.destroy();
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id/accounts/:accountId",
  requireToken,
  isAdmin,
  async (req, res, next) => {
    try {
      const updatedAccount = await Account.findByPk(req.params.accountId);
      await updatedAccount.update(req.body);
      res.send(updatedAccount);
    } catch (error) {
      next(error);
    }
  }
);

//Admin-Class routes
router.get("/:id/classes", requireToken, isAdmin, async (req, res, next) => {
  try {
    const classList = await Class.findAll();
    res.send(classList);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id/classes/:classId",
  requireToken,
  isAdmin,
  async (req, res, next) => {
    try {
      const singleClass = await Class.findByPk(req.params.classId, {
        include: [Announcement, Module],
      });
      res.send(singleClass);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/:id/classes", requireToken, isAdmin, async (req, res, next) => {
  try {
    const addClass = await Class.create(req.body);
    res.send(addClass);
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/:id/classes/:classId",
  requireToken,
  isAdmin,
  async (req, res, next) => {
    try {
      const deletedClass = await Class.findByPk(req.params.classId);
      await deletedClass.destroy();
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id/classes/:classId",
  requireToken,
  isAdmin,
  async (req, res, next) => {
    try {
      const updatedClass = await Class.findByPk(req.params.classId);
      await updatedClass.update(req.body);
      res.send(updatedClass);
    } catch (error) {
      next(error);
    }
  }
);

//Admin-Module routes
router.get("/:id/modules", requireToken, isAdmin, async (req, res, next) => {
  try {
    const moduleList = await Module.findAll();
    res.send(moduleList);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id/modules/:moduleId",
  requireToken,
  isAdmin,
  async (req, res, next) => {
    try {
      const singleModule = await Module.findByPk(req.params.moduleId, {
        include: [Assignment],
      });
      res.send(singleModule);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/:id/modules", requireToken, isAdmin, async (req, res, next) => {
  try {
    const addModule = await Module.create(req.body);
    res.send(addModule);
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/:id/modules/:moduleId",
  requireToken,
  isAdmin,
  async (req, res, next) => {
    try {
      const deletedModule = await Module.findByPk(req.params.moduleId);
      await deletedModule.destroy();
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id/modules/:moduleId",
  requireToken,
  isAdmin,
  async (req, res, next) => {
    try {
      const updatedModule = await Module.findByPk(req.params.moduleId);
      await updatedModule.update(req.body);
      res.send(updatedModule);
    } catch (error) {
      next(error);
    }
  }
);

// admin-assignment routes

router.get(
  "/:id/assignments",
  requireToken,
  isAdmin,
  async (req, res, next) => {
    try {
      const assignmentList = await Assignment.findAll();
      res.send(assignmentList);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id/assignments/:assignmentId",
  requireToken,
  isAdmin,
  async (req, res, next) => {
    try {
      const singleAssignment = await Assignment.findByPk(
        req.params.assignmentId
      );
      res.send(singleAssignment);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:id/assignments",
  requireToken,
  isAdmin,
  async (req, res, next) => {
    try {
      const addAssignment = await Assignment.create(req.body);
      res.send(addAssignment);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id/assignments/:assignmentId",
  requireToken,
  isAdmin,
  async (req, res, next) => {
    try {
      const deletedAssignment = await Assignment.findByPk(
        req.params.assignmentId
      );
      await deletedAssignment.destroy();
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id/assignments/:assignmentId",
  requireToken,
  isAdmin,
  async (req, res, next) => {
    try {
      const updatedAssignment = await Assignment.findByPk(
        req.params.assignmentId
      );
      await updatedAssignment.update(req.body);
      res.send(updatedAssignment);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

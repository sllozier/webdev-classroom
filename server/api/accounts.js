const router = require("express").Router();
const {
  Account,
  Class,
  Module,
  Assignment,
  Announcement,
  Student,
} = require("../db");
const { requireToken, isAdmin } = require("./gateKeeper");

//Account routes
router.get("/", async (req, res, next) => {
  try {
    const accountList = await Account.findAll();
    res.send(accountList);
  } catch (error) {
    next(error);
  }
});

// User Dashboard (if registered for classes, they will be displayed)
router.get("/:id", async (req, res, next) => {
  try {
    const accountData = await Account.findByPk(req.params.id, {
      include: {
        model: Class,
      },
    });
    res.send(accountData);
  } catch (error) {
    next(error);
  }
});

//MAY NOT NEED THIS IF I HAVE ADMIN AND AUTH
// router.post("/", async (req, res, next) => {
//   try {
//     req.body.isAdmin = false;
//     const account = await Account.create(req.body);
//     res.send(account);
//   } catch (error) {
//     next(error);
//   }
// });

router.put("/:id", async (req, res, next) => {
  try {
    const account = await Account.findByPk(req.account.accountId);
    await account.update(req.body);
    res.send(account);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deleteAccount = await Account.findByPk(req.params.accountId);
    await deleteAccount.destroy();
    res.send(deleteAccount);
  } catch (error) {
    next(error);
  }
});

//user class routes
//Get all of user's classes
//front end route should be /dashboard/:id
router.get("/:id/classes", async (req, res, next) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (account) {
      const classes = await account.getClasses({
        include: [Module],
      });
      res.send(classes);
    } else {
      res.status(404).send("Account not found");
    }
  } catch (error) {
    next(error);
  }
});

//Get single class for user
router.get("/:id/classes/:classId", async (req, res, next) => {
  try {
    const singleClass = await Class.findByPk(req.params.classId, {
      include: [Announcement, Module],
    });
    res.send(singleClass);
  } catch (error) {
    next(error);
  }
});

// Add user to class (somehow show class offerings)
router.put("/:id", async (req, res, next) => {
  try {
    const addedClass = await Class.findOne({
      where: {
        id: req.body.classId,
      },
    });
    await addedClass.addAccount(req.params.accountId);
    res.send(addedClass);
  } catch (error) {
    next(error);
  }
});

//Update class size
router.put("/:id", async (req, res, next) => {
  try {
    const account = await Account.findByPk(req.params.accountId);
    const singleClass = await Class.findOne({
      where: {
        id: req.body.classId,
      },
    });

    if (req.body.op === "increment") {
      await Student.increment(
        { classSize: account.count },
        {
          where: {
            classId: req.body.classId,
            accountId: req.params.accountId,
          },
        }
      );
      await singleClass.increment(
        { size: account.count },
        {
          where: {
            id: req.body.classId,
          },
        }
      );
    } else if (req.body.op === "remove") {
      await singleClass.decrement(
        { size: singleClass.size - req.body.num },
        {
          where: {
            id: req.body.classId,
          },
        }
      );
    }
    res.send(singleClass);
  } catch (error) {
    next(error);
  }
});

//remove user from class
router.delete("/:id", async (req, res, next) => {
  try {
    const singleClass = await Class.findOne({
      where: {
        id: req.body.classId,
      },
      include: {
        model: Account,
        where: {
          id: req.params.accountId,
        },
      },
    });
    await singleClass.removeAccount(req.params.accountId);
    res.send(singleClass);
  } catch (error) {
    next(error);
  }
});

//Get single module for single class for user
router.get(
  "/:id/classes/:classId/module/:moduleId",

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

//Get single assignment in module
router.get(
  "/:id/classes/module/:moduleId/assignments/:assignmentId",

  async (req, res, next) => {
    try {
      const singleAssignment = await Assignment.findByPk(
        req.params.assignmentId,
        {
          where: {
            moduleId: req.params.moduleId,
          },
        }
      );
      res.send(singleAssignment);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id/classes/:classId/announcements", async (req, res, next) => {
  try {
    const announcements = await Announcement.findAll({
      where: {
        classId: req.params.classId,
      },
    });

    res.send(announcements);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id/classes/:classId/announcements/:announcementId",
  async (req, res, next) => {
    try {
      const announcement = await Announcement.findByPk(
        req.params.announcementId
      );
      res.send(announcement);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/:id/classes/:classId/announcements", async (req, res, next) => {
  try {
    const newAnnouncement = await Announcement.create(req.body);
    res.send(newAnnouncement);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id/classes/:classId/annoucements/:announcementId",
  async (req, res, next) => {
    try {
      const updatedAnnouncement = await Announcement.findByPk(
        req.params.announcementId
      );
      await updatedAnnouncement.update(req.body);
      res.send(updatedAnnouncement);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id/classes/:classId/announcements/:announcementId",
  async (req, res, next) => {
    try {
      const deletedAnnouncement = await Announcement.findByPk(
        req.params.announcementId
      );
      await deletedAnnouncement.destroy();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

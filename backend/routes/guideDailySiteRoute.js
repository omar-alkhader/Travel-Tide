const express = require("express");
const router = express.Router();
const guideCtrl = require("../controllers/guideDailySites");

// GET all guides' daily sites
// router.get("/", guideCtrl.getAllDailySites);

// GET daily sites for a specific date
router.get(
  "/city/:city/date/:date",
  guideCtrl.getGuidesDailySitesByCityAndDate
);
// router.patch("/:id", guideCtrl.updateDailySite);
// router.delete("/:id", guideCtrl.deleteDailySite);

// // POST a new daily guide site entry
// router.post("/", guideCtrl.addGuideDailySite);

module.exports = router;

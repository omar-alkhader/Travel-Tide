const GuideDailySites = require("../models/guideDailySiteModel");
const catchAsync = require("../utlis/catchAsync");

// Get all daily site schedules for all guides
exports.getAllDailySites = catchAsync(async (req, res) => {
  const guides = await GuideDailySites.getDailySitesForAllGuides();
  res.status(200).json({
    status: "success",
    data: {
      guides: guides.rows,
    },
  });
});

// Get daily site schedules for a specific date
exports.getGuidesByDate = async (req, res) => {
  const { visit_date } = req.params;

  const guides = await GuideDailySites.getGuidesByDate(visit_date);
  res.status(200).json({
    status: "success",
    data: {
      guides,
    },
  });
};

// Add a new daily site schedule
exports.addGuideDailySite = async (req, res) => {
  const { guide_id, site_id, visit_date, max_limit } = req.body;

  try {
    const newEntry = await GuideDailySites.addGuideDailySite({
      guide_id,
      site_id,
      visit_date,
      max_limit,
    });
    res
      .status(201)
      .json({ message: "Daily site added successfully", data: newEntry });
  } catch (error) {
    console.error("Error adding guide daily site:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

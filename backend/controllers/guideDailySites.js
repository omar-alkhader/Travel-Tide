const db = require("../db"); // Assuming you have a database connection setup
const GuideDailySites = require("../models/guideDailySiteModel");
const catchAsync = require("../utlis/catchAsync");
const AppError = require("../utlis/AppError");

// Get all daily site schedules for all guides
exports.getGuidesDailySitesByCityAndDate = catchAsync(
  async (req, res, next) => {
    const { city, date } = req.params;
    console.log("hello");
    // Validate that the city name and date are provided
    if (!city || !date) {
      return next(new AppError("City name and date are required.", 400));
    }

    // SQL query to fetch guides_daily_sites for the provided city and date
    const query = `
    SELECT 
      gds.id AS guide_daily_site_id,
      gds.guide_id,
      g.price AS guide_price,
      gds.site_id,
      s.name AS site_name,
      gds.visit_date,
      gds.max_limit
    FROM Guides_daily_sites gds
    JOIN site s ON gds.site_id = s.id
    JOIN city c ON s.city_id = c.id
    JOIN Guide g ON gds.guide_id = g.id
    WHERE c.name = $1 AND gds.visit_date = $2
  `;

    try {
      // Execute the query
      const { rows } = await db.query(query, [city, date]);

      // Return the results
      res.status(200).json({
        status: "success",
        results: rows.length,
        data: rows,
      });
    } catch (err) {
      console.error(err);
      return next(new AppError("Failed to fetch data from the database.", 500));
    }
  }
);

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

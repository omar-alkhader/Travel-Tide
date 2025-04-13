const db = require("../db");

exports.getDailySitesForAllGuides = async () => {
  const result = await db.query(`
    SELECT 
      gds.guide_id,
      g.name AS guide_name,
      gds.visit_date,
      gds.site_id,
      s.name AS site_name,
      gds.max_limit
    FROM guides_daily_sites gds
    JOIN guide g ON g.id = gds.guide_id
    JOIN site s ON s.id = gds.site_id
    ORDER BY gds.visit_date, gds.guide_id, s.name
  `);
  return result;
};

exports.getGuidesByDate = async (visit_date) => {
  const result = await db.query(
    `
    SELECT 
      gds.guide_id,
      g.name AS guide_name,
      gds.visit_date,
      gds.site_id,
      s.name AS site_name,
      gds.max_limit
    FROM guides_daily_sites gds
    JOIN guide g ON g.id = gds.guide_id
    JOIN site s ON s.id = gds.site_id
    WHERE gds.visit_date = $1
    ORDER BY gds.guide_id, s.name
  `,
    [visit_date]
  );

  return result;
};

// Insert new daily guide-site schedule
exports.addGuideDailySite = async ({
  guide_id,
  site_id,
  visit_date,
  max_limit,
}) => {
  const result = await db.query(
    `
    INSERT INTO guides_daily_sites (guide_id, site_id, visit_date, max_limit)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `,
    [guide_id, site_id, visit_date, max_limit]
  );

  return result;
};

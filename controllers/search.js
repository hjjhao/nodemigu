const express = require("express");
const router = express.Router();
const helpers = require("./../helpers");

/**
 * POST Request
 * search
 */
router.get("/search", async (req, res) => {
  try {
    const { keyword } = req.query;
    const options = {
      pgc: 1,
      rows: 20,
      type: 2
    };
    if (!keyword) {
      return helpers.common.response(
        res,
        "Bad Request",
        "Missing keyword",
        400
      );
    }

    return helpers.common.response(res, "succeed", users[0], 200);
  } catch (error) {
    console.error(error);
    return helpers.common.response(res, "failed", error, 500);
  }
});

module.exports = router;

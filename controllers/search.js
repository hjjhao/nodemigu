const express = require("express");
const router = express.Router();
const helpers = require("./../helpers");
const qs = require("qs");
const axios = require("axios");

/**
 * POST Request
 * search
 */
router.get("/", async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword) {
      return helpers.common.response(
        res,
        "Bad Request",
        "Missing keyword",
        400
      );
    }
    const options = {
      keyword,
      pgc: 1,
      rows: 20,
      type: 2
    };
    const headers = {
      referer: "http://music.migu.cn/v3",
      "X-Real-IP": "219.146.1.66"
    };
    const searchUrl = `http://m.music.migu.cn/migu/remoting/scr_search_tag?`;
    const url = searchUrl + qs.stringify(options);
    const { data } = await axios.get(url, { headers, withCredentials: true });

    return helpers.common.response(res, "succeed", data, 200);
  } catch (error) {
    console.error(error);
    return helpers.common.response(res, "failed", error, 500);
  }
});

module.exports = router;

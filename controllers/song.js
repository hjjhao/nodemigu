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
    const { cid } = req.query;
    if (!cid) {
      return helpers.common.response(
        res,
        "Bad Request",
        "Missing keyword",
        400
      );
    }
    const headers = {
      referer: "http://music.migu.cn/v3"
    };
    const songUrl = `http://m.music.migu.cn/migu/remoting/cms_detail_tag`;
    const url = songUrl + `?cpid=${cid}`;

    const {data} = await axios.get(url, { headers, withCredentials: true });

    return helpers.common.response(res, "succeed", data, 200);
  } catch (error) {
    console.error(error);
    return helpers.common.response(res, "failed", error, 500);
  }
});

module.exports = router;

const helpers = require("./../helpers");
const fs = require("fs");
const moment = require("moment");
const dotenv = require('dotenv').config()['parsed'];

const mw = {
  auth: (req,res,next)=>{
    try {
      const url = req.originalUrl || '/';
      const whiteList = dotenv.WHITE_LIST ? dotenv.WHITE_LIST.split(',') : [];

      console.info(moment().format("YYYY-MM-DD HH:mm:ss"), req.method, url);
      if (whiteList.some(path => url.includes(path)) || url == '/')
          return next();

    } catch (error) {
      console.error(error);
      return helpers.common.response(res, "failed", error, 500);
    }
  }
}

module.exports = mw;
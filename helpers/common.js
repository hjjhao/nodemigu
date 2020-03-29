const fs = require("fs")
const moment = require("moment");
const shortid = require("shortid");

const common = {
  /**
   * Return Response
   *
   * @param {Response} res response
   * @param {String} msg response message
   * @param {*} detail response payload
   * @param {Number} code return code
   * @returns
   */
  response(res, msg, detail, code) {
    this.writeLog(`\nTime: ${moment().format("YYYY-MM-DD HH:mm:sssS")} | Code: ${code} | Msg: ${msg}`);

    if (code === 500) {
      console.log(detail)
      const errorId = shortid();
      try {
        this.writeLog(`\nTime: ${moment().format("YYYY-MM-DD HH:mm:sssS")} | Error ${errorId}: ${detail.toString()}`);
      } catch (error) {
        this.writeLog(`\nTime: ${moment().format("YYYY-MM-DD HH:mm:sssS")} | Unalbe to write error detail to log for ${errorId}`);
      }
      return res.status(500).send({
        msg: msg,
        detail: `Unexpected error occured, please screenshot the page with error code ${errorId} and send to our customer support, thank you.`
      })
    }

    return res.status(code).send({
      msg: msg,
      detail: detail
    })
  },

  /**
   * Write into Log
   *
   * @param {String} msg
   */
  writeLog(msg) {
    const path = `${__dirname}/../logs/${moment().format("YYYY-MM-DD")}.log`;
    fs.appendFileSync(path, msg);
  }
}

module.exports = common
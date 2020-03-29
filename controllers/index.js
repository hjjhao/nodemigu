const search = require("./search");
const song = require("./song");

const controllers = [
  {
    path: "/search",
    route: search
  },
  {
    path: "/song",
    route: song
  }
];

module.exports = controllers;

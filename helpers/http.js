const axios = require('axios');

module.exports = {
  send(url, method = 'get', payload = {}, token = "Bearer ") {
    const instance = axios.create({
      timeout: 60 * 1000,
      headers: { Authorization: token }
    });

    return instance[method](url, payload)
  }
}
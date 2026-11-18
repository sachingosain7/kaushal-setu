/**
 * Vercel Serverless Function Entry Point for Kaushal Setu
 * Directs API requests to server.js request handler
 */
const requestHandler = require('../server.js');

module.exports = (req, res) => {
  return requestHandler(req, res);
};

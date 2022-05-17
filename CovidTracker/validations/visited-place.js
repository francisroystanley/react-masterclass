const { check } = require("express-validator");

const createAndUpdateRules = [
  check("place", "Place is required").not().isEmpty(),
  check("date", "Date is required").not().isEmpty(),
  check("hours", "Hours is required").not().isEmpty()
];

module.exports = {
  createAndUpdateRules
};

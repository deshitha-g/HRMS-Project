const express = require("express");
const router = express.Router();

router.get("/fetchLeaveRequestsDept", (req, res) => {
  const db = req.db; // Access the 'db' object from the request
  const time = req.query.time; // Assuming the "time" variable is sent from the front end as a query parameter
  console.log("time:", time);
  let interval = ""; // Define an empty interval string

  if (time === "month") {
    interval = "1 MONTH";
  } else if (time === "year") {
    interval = "1 YEAR";
  } else {
    // Handle invalid or missing "time" parameter
    return res
      .status(400)
      .json({ error: "Invalid or missing 'time' parameter" });
  }

  const query = `SELECT * FROM leave_req_dept_2 WHERE start_date BETWEEN DATE_SUB(CURDATE(), INTERVAL ${interval}) AND CURDATE()`;

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error querying the database: " + error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;

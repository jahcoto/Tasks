import { connectDB, closeDB } from "../config/db.js";

//get all Status
const getStatus = async (req, res) => {
  con = await connectDB();
  const sql = "SELECT * FROM status";
  con.query(sql, (err, results) => {
    if (err) {
      res = err;
    } else {
      res.json({
        results,
      });
      closeDB(con);
    }
  });
};

export { getStatus };

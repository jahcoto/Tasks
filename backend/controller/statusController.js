import { connectDB, closeDB } from "../config/db.js"; //Se importa los metodos de conectar y cerrar conexion

let con = "";

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

//Get all status name
const getName = async (req, res) => {
  //const status = req.params.id;
  con = await connectDB();
  const sql = `SELECT status_name FROM status`;
  con.query(sql, (err, results) => {
    if (err) {
      res.json({
        msg: err,
      });
    } else {
      res.json({
        results,
      });
      //return res;
      closeDB(con);
    }
  });
};

//Add new Status
const newStatus = async (req, res) => {
  const status_id = req.body.status_id;
  const status_name = req.body.status_name;
  const status_description = req.body.status_description;

  con = await connectDB();
  const sql = `INSERT INTO status values(${status_id}, '${status_name}', '${status_description}')`;
  con.query(sql, (err, results) => {
    if (err) {
      res.json({
        msg: err,
      });
    } else {
      console.log(results);
      res.json({
        results,
      });

      //return res;
      closeDB(con);
    }
  });
};

//Update a status
const updateStatus = async (req, res) => {
  const status_id = req.body.status_id;
  const status_name = req.body.status_name;
  const status_description = req.body.status_description;

  con = await connectDB();
  const sql = `UPDATE status SET status_name = '${status_name}', status_description = '${status_description}' where status_id = ${status_id}`;
  con.query(sql, (err, results) => {
    if (err) {
      res.json({
        msg: err,
      });
    } else {
      //console.log(results[0].task_id);
      console.log(results);
      res.json({
        results,
      });

      closeDB(con);
    }
  });
};

//Delete a status
const deleteStatus = async (req, res) => {
  const status_id = req.body.status_id;
  con = await connectDB();
  const sql = `DELETE from status where status_id = ${status_id}`;
  con.query(sql, (err, results) => {
    if (err) {
      res.json({
        msg: err,
      });
    } else {
      //console.log(results[0].task_id);
      console.log(results);
      res.json({
        results,
      });

      closeDB(con);
    }
  });
};

//Se exportan todos los metodos del controlador
export { getStatus, getName, newStatus, updateStatus, deleteStatus };

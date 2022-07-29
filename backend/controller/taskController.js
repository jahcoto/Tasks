import { connectDB, closeDB } from "../config/db.js";

let con = "";
let res;

const formatDate = (date) => {
  return new Date(date).toISOString().slice(0, 19).replace("T", " ");
};

//get all Tasks
const getTasks = async (req, res) => {
  con = await connectDB();
  const sql = "SELECT * FROM tasks";
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

//Get a task by id
const getTask = async (req, res) => {
  const task_id = req.params.id;
  console.log(task_id);
  con = await connectDB();
  const sql = `SELECT * FROM tasks where task_id = ${task_id}`;
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

//Add new task
const newTask = async (req, res) => {
  const task_id = req.body.task_id;
  const title = req.body.title;
  const start_date = req.body.start_date;
  const due_date = req.body.due_date;
  const status = req.body.status;
  const priority = req.body.priority;
  const description = req.body.description;
  const created_at = formatDate(Date.now());
  const user = req.body.user;

  con = await connectDB();
  const sql = `INSERT INTO tasks values(${task_id}, '${title}', ${start_date}, ${due_date},${status},${priority}, '${description}',' ${created_at}', ${user})`;
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

      //return res;
      closeDB(con);
    }
  });
};

//Update a task
const updateTask = async (req, res) => {
  const task_id = req.body.task_id;
  const title = req.body.title;
  const start_date = req.body.start_date;
  const due_date = req.body.due_date;
  const status = req.body.status;
  const priority = req.body.priority;
  const description = req.body.description;
  const created_at = req.body.created_at;
  const user = req.body.user;

  con = await connectDB();
  const sql = `UPDATE tasks SET title = '${title}', start_date = ${start_date}, due_date = ${due_date},status = ${status},priority = ${priority},description = '${description}',created_at = ${created_at},user = ${user} where task_id = ${task_id}`;
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

      //return res;
      closeDB(con);
    }
  });
  /*res.json({
    msg: "Updating a task.",
  });*/
};

//Delete a task
const deleteTask = async (req, res) => {
  const task_id = req.body.task_id;
  con = await connectDB();
  const sql = `DELETE from tasks where task_id = ${task_id}`;
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

      //return res;
      closeDB(con);
    }
  });
  /*res.json({
    msg: "Deleting a task.",
  });*/
};

export { getTasks, newTask, updateTask, deleteTask, getTask };

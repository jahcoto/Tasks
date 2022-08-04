import { connectDB, closeDB } from "../config/db.js"; //Se importa los metodos de conectar y cerrar conexion

let con = "";
let res;

const formatDate = (date) => {
  return new Date(date).toISOString().slice(0, 19).replace("T", " ");
};

//Get all Tasks. Metodo para obtener todas las tareas
const getTasks = async (req, res) => {
  con = await connectDB();
  const sql = "SELECT * FROM tasks";
  con.query(sql, (err, results) => {
    if (err) {
      res.json({
        msg: err,
      });
    } else {
      res.json({
        results,
      });
      closeDB(con);
    }
  });
};

//Get a task by id. Metodo para obtener la tarea por el id
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

//Add new task. Metodo para agregar una nueva tarea a la BD
const newTask = async (req, res) => {
  //Declaracion de las variables y se les asigna el valor extraido desde el body
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

//Update a task. Metodo para actualizar una tarea
const updateTask = async (req, res) => {
  //Declaracion de las variables y se les asigna el valor extraido desde el body
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

      closeDB(con);
    }
  });
};

//Delete a task. Metodo para eliminar una tarea.
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

      closeDB(con);
    }
  });
};

//Se exportan todos los metodos del controlador
export { getTasks, newTask, updateTask, deleteTask, getTask };

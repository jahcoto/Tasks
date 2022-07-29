import mysql from "mysql";

const connectDB = async (sql) => {
  let res;
  let json_res;
  let connection;
  try {
    connection = mysql.createConnection(process.env.CONNECTION_STRING);
    connection.connect();

    console.log("DataBase connected!!!");
    /*connection.query(sql, (err, results) => {
      if (err) {
        res = err;
        return res;
      } else {
        console.log(results[0].task_id);
        res = results;
        console.log(res);
        //return res;
      }
    });*/
    //connection.end();
  } catch (error) {
    res = `Error: ${error.message}`;
    return res;
  }
  //console.log(res);
  //json_res = JSON.parse(res);
  return connection;
};

const closeDB = (connection) => {
  connection.end();
};

export { connectDB, closeDB };

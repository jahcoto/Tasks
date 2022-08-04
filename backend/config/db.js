import mysql from "mysql";

//Metodo que nos permite conectar la BD
const connectDB = async () => {
  let res;
  let json_res;
  let connection;
  try {
    connection = mysql.createConnection(process.env.CONNECTION_STRING); //Crea la conexion yse asigna a la variable
    connection.connect();

    console.log("DataBase connected!!!");
    //connection.end();
  } catch (error) {
    res = `Error: ${error.message}`;
    return res;
  }
  //json_res = JSON.parse(res);
  return connection; //Devuelve la variable con la conexion.
};

//Metodo que nos permite cerrar la conexion, se recibe la variable que contiene la conexion
const closeDB = (connection) => {
  connection.end();
};

export { connectDB, closeDB };

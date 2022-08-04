import { connectDB, closeDB } from "../config/db.js"; //Se importa los metodos de conectar y cerrar conexion

let con = "";

//Get all Users. Metodo para extraer todos los usuarios
const getUsers = async (req, res) => {
  con = await connectDB();
  const sql = "SELECT * FROM users";
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

//Get all user Names. Metodo que devuelve todos los first_name, last_name y user_id
const getNames = async (req, res) => {
  con = await connectDB();
  const sql = "SELECT user_id, user_first_name, user_last_name FROM users";
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

//Add a new user. Metodo para agregar un nuevo usuario junto con su direccion
const newUser = async (req, res) => {
  //Declaracion de las variables y se les asigna el valor extraido desde el body
  const user_id = req.body.user_id;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const phone = req.body.phone;
  const address_id = req.body.address_id;
  const pais = req.body.pais;
  const provincia = req.body.provincia;
  const canton = req.body.canton;
  const distrito = req.body.distrito;
  const direccion = req.body.direccion;

  con = await connectDB();
  //Se crea el registro de la direccion
  const address = `INSERT INTO address values(${address_id}, '${pais}', '${provincia}', '${canton}','${direccion}','${distrito}')`;
  con.query(address, (err, res_address) => {
    if (err) {
      res.json({
        msg: err,
      });
    } else {
      //Se crea el usuario una vez ya se haya agregado la direccion
      const user = `INSERT INTO users values(${user_id}, '${first_name}', '${last_name}', '${email}','${phone}',${address_id})`;
      con.query(user, (err, res_user) => {
        if (err) {
          res.json({
            msg: err,
          });
        } else {
          res.json({
            res_user,
            res_address,
          });
          closeDB(con);
        }
      });
    }
  });
};

//Update a user. Metodo para actualizar un usuario y la direccion asociada
const updateUser = async (req, res) => {
  //Declaracion de las variables y se les asigna el valor extraido desde el body
  const user_id = req.body.user_id;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const phone = req.body.phone;
  const address_id = req.body.address_id;
  const pais = req.body.pais;
  const provincia = req.body.provincia;
  const canton = req.body.canton;
  const distrito = req.body.distrito;
  const direccion = req.body.direccion;

  con = await connectDB();
  //Se actualiza el registro de la direccion
  const address = `UPDATE address SET pais = '${pais}', provincia = '${provincia}', canton = '${canton}', direccion = '${direccion}', distrito = '${distrito}' WHERE address_id = ${address_id}`;
  con.query(address, (err, res_address) => {
    if (err) {
      res.json({
        msg: err,
      });
    } else {
      //Se actualiza el usuario una vez ya se haya actualizado la direccion
      const user = `UPDATE users SET user_first_name = '${first_name}', user_last_name = '${last_name}', user_email = '${email}', user_phone = '${phone}' WHERE user_id = ${user_id}`;
      con.query(user, (err, res_user) => {
        if (err) {
          res.json({
            msg: err,
          });
        } else {
          res.json({
            res_user,
            res_address,
          });
          closeDB(con);
        }
      });
    }
  });
};

//Deleting a user. Metodo para eliminar el usuario y la direccion asociada
const deleteUser = async (req, res) => {
  const user_id = req.body.user_id;
  const address_id = req.body.address_id;

  con = await connectDB();
  //Se elimina el usuario
  const user = `DELETE FROM users WHERE user_id = ${user_id}`;
  con.query(user, (err, res_user) => {
    if (err) {
      res.json({
        msg: err,
      });
    } else {
      //Se elimina la direccion relacionada al usuario
      const address = `DELETE from address WHERE address_id = ${address_id}`;
      con.query(address, (err, res_address) => {
        if (err) {
          res.json({
            msg: err,
          });
        } else {
          res.json({
            res_user,
            res_address,
          });
          closeDB(con);
        }
      });
    }
  });
};

//Se exportan todos los metodos del controlador
export { getUsers, getNames, newUser, updateUser, deleteUser };

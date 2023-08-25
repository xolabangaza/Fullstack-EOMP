const db = require("../config/database.js");
const { hash, compare, hashSync } = require("bcrypt");
const { createToken } = require("../middleware/Authentication");

const getUsers = (result) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

const getUserById = (id, result) => {
  db.query("SELECT * FROM users WHERE userID = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results[0]);
    }
  });
};

const register = async (req, res) => {
  try {
    const data = req.body;
    // Encrypt password
    data.userPass = await hash(data.userPass, 15);
    const user = {
      emailAdd: data.emailAdd,
      userPass: data.userPass,
    };
    // Query
    const query = `INSERT INTO users SET ?`;
    db.query(query, [data], (err) => {
      if (err) throw err;
      // Create a token
      const token = createToken(user);
      res.json({
        status: res.statusCode,
        msg: "You are now registered.",
      });
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      status: res.statusCode,
      error: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { emailAdd, userPass } = req.body;
    const query = `
      SELECT userID, firstName, lastName, userAge, gender, userRole,
      emailAdd, profileUrl, userPass
      FROM users
      WHERE emailAdd = ?;
    `;
    db.query(query, [emailAdd], async (err, result) => {
      if (err) throw err;
      if (!result?.length) {
        res.json({
          status: res.statusCode,
          msg: "You provided a wrong email.",
        });
      } else {
        const passwordMatch = await compare(userPass, result[0].userPass);
        if (passwordMatch) {
          const token = createToken({ emailAdd, userPass });
          res.json({
            msg: "Logged in",
            token,
            result: result[0],
          });
        } else {
          res.json({
            status: res.statusCode,
            msg: "Invalid password or you have not registered",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      status: res.statusCode,
      error: "Internal server error",
    });
  }
};

const updateUser = (req, res) => {
  const data = req.body;
  if (data.userPass) {
    data.userPass = hashSync(data.userPass, 15);
  }
  const query = `UPDATE users SET ? WHERE userID = ?`;
  db.query(query, [data, req.params.id], (err) => {
    if (err) throw err;
    res.json({
      status: res.statusCode,
      msg: "The user record was updated.",
    });
  });
};

const deleteUser = (req, res) => {
  const query = `DELETE FROM users WHERE userID = ?`;
  db.query(query, [req.params.id], (err) => {
    if (err) throw err;
    res.json({
      status: res.statusCode,
      msg: "A user record was deleted.",
    });
  });
};

module.exports = {
  getUsers,
  getUserById,
  register,
  login,
  updateUser,
  deleteUser,
};

// const db = require("../config");
// const { hash, compare, hashSync } = require("bcrypt");
// const { createToken } = require("../middleware/Authentication");
// class users {
//   fetchUsers(req, res) {
//     const query = `SELECT userID, firstName, lastName, userAge, gender, userRole, emailAdd, profileUrl FROM users;`;
//     db.query(query, (err, results) => {
//       if (err) throw err;
//       res.json({
//         status: res.statusCode,
//         results,
//       });
//     });
//   }
//   fetchUser(req, res) {
//     const query = `
//         SELECT userID, firstName, lastName, userAge, gender, userRole, emailAdd, profileUrl
//         FROM users
//         WHERE userId = ${req.params.id};
//         `;
//     db.query(query, (err, result) => {
//       if (err) throw err;
//       res.json({
//         status: res.statusCode,
//         result,
//       });
//     });
//   }
//   async register(req, res) {
//     const data = req.body;
//     //encrypt password
//     data.userPass = await hash(data.userPass, 15);
//     const user = {
//       emailAdd: data.emailAdd,
//       userPass: data.userPass,
//     };
//     //query
//     const query = `
//       INSERT INTO users
//       SET ?;
//       `;
//     db.query(query, [data], (err) => {
//       if (err) throw err;
//       //create a token
//       let token = createToken(user);
//       res.json({
//         status: res.statusCode,
//         msg: "You are now registered.",
//       });
//     });
//   }
//   login(req, res) {
//     const { emailAdd, userPass } = req.body;
//     const query = `
//       SELECT userID, firstName, lastName, userAge, gender, userRole, emailAdd, profileUrl
//       FROM users
//       WHERE emailAdd = ?;
//     `;
//     db.query(query, [emailAdd], async (err, result) => {
//       if (err) throw err;
//       if (!result?.length) {
//         res.json({
//           status: res.statusCode,
//           msg: "You provided a wrong email.",
//         });
//       } else {
//         await compare(userPass, result[0].userPass, (cErr, cResult) => {
//           if (cErr) throw cErr;
//           // Create a token
//           const token = createToken({
//             emailAdd,
//             userPass,
//           });
//           if (cResult) {
//             res.json({
//               msg: "Logged in",
//               token,
//               result: result[0],
//             });
//           } else {
//             res.json({
//               status: res.statusCode,
//               msg: "Invalid password or you have not registered",
//             });
//           }
//         });
//       }
//     });
//   }
//   updateUser(req, res) {
//     const data = req.body;
//     if (data.userPass) {
//       data.userPass = hashSync(data.userPass, 15);
//     }
//     const query = `
//         UPDATE users
//         SET ?
//         WHERE userID = ?
//         `;
//     db.query(query, [data, req.params.id], (err) => {
//       if (err) throw err;
//       res.json({
//         status: res.statusCode,
//         msg: "The user record was updated.",
//       });
//     });
//   }
//   deleteUser(req, res) {
//     const query = `DELETE FROM users
//         WHERE userID = ?`;
//     db.query(query, [req.params.id], (err) => {
//       if (err) throw err;
//       res.json({
//         status: res.statusCode,
//         msg: "A user record was deleted.",
//       });
//     });
//   }
// }
// module.exports = users;

const {
  getUsers,
  getUserById,
  register,
  login,
  updateUser,
  deleteUser,
} = require("../models/users");

const showUsers = (req, res) => {
  getUsers((err, results) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
};

const showUserById = (req, res) => {
  const id = req.params.id;
  getUserById(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (!result) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.json(result);
      }
    }
  });
};

const createRegister = (req, res) => {
  const data = req.body;
  register(data, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ msg: "You are now registered." });
    }
  });
};

const loginUser = (req, res) => {
  const data = req.body;
  login(data, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      // Assuming `results` contains user information including user ID
      const id = results.userID;
      res.json({ msg: "Logged in", result: results });
    }
  });
};

const updateUserById = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  updateUser(id, data, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ msg: "The user record was updated." });
    }
  });
};

const deleteUserById = (req, res) => {
  const id = req.params.id;
  deleteUser(id, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ msg: "A user record was deleted." });
    }
  });
};

module.exports = {
  showUsers,
  showUserById,
  createRegister,
  loginUser,
  updateUserById,
  deleteUserById,
};


const express = require("express");
const userRouter = express.Router();
const User = require("../Models/userModel");

userRouter
  .route("/users")
  .post((req, res) => {
    const user = new User(req.body);
    user.save().catch((err) => console.error(err));
    return res.status(201).json(user);
  })
  .get((req, res) => {
    User.find({}, (err, users) => {
      if (err) {
        return res.send(err);
      }
      console.log(users);
      return res.json(users);
    });
  });

userRouter
  .route("/users/:userId")
  .delete((req, res) => {
    User.deleteOne({ _id: `${req.params.userId}` }, (err) => {
      if (err) {
        return res.send(err);
      }
      return res.json({ Success: "true" });
    });
  })
  .patch((req, res) => {
    User.updateOne({ _id: `${req.params.userId}` }, req.body, (err, result) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json(result);
      }
    });
  })
  .post((req, res) => {
    User.updateOne({ _id: `${req.params.userId}` }, req.body, (err, result) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json(result);
      }
    });
  })
  .put((req, res) => {
    User.replaceOne(
      { _id: `${req.params.userId}` },
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        profession: req.body.profession,
        hasDegree: req.body.read || false,
      },
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.json(result);
        }
      }
    );
  })
  .get((req, res) => {
    User.findById(req.params.userId, (err, user) => {
      if (err) {
        return res.send(err);
      }
      if (user) {
        return res.json(user);
      }
      return res.sendStatus(404);
    });
  });

module.exports = userRouter;

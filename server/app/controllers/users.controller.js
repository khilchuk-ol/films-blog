import db from "../models/models.js";
import { getPagination } from "./pagination.js";

const User = db.users;
const Post = db.posts;

function create(req, res) {
  // Validate request
  if (!req.body.username || !req.body.password || !req.body.email) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a User
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    picture: req.body.picture,
    roles: req.body.roles,
  });

  //Save in the db
  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
}

//Can also specify username filter
function findAll(req, res) {
  const { username, page, size } = req.query;

  let condition = username
    ? { username: { $regex: new RegExp(username), $options: "i" } }
    : {};

  const { limit, offset } = getPagination(page, size);

  User.paginate(condition, { offset, limit })
    .then(async (data) => {
      res.send({
        totalItems: data.totalDocs,
        items: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
}

function findOne(req, res) {
  const id = req.params.id;

  User.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Not found User with id " + id,
        });
      } else {
        Post.find({ author: data._id }).then((posts) => {
          data.posts = posts;
          res.send({ user: data });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving User with id=" + id,
      });
    });
}

async function getById(id) {
  return await User.findById(id);
}

function update(req, res) {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update cannot be empty",
    });
    return false;
  }

  const id = req.params.id;
  req.body.posts = undefined;

  User.findOneAndUpdate({ _id: id }, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe Post was not found!`,
        });
      } else {
        if (
          req.session.passport &&
          req.session.passport.user &&
          res.locals.currentUser.id === id
        ) {
          res.locals.currentUser = data.toObject();
        }
        res.send({
          message: "User was updated successfully.",
          user: data.toObject(),
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating User with id=" + id,
      });
    });
}

function remove(req, res) {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      } else {
        Post.deleteMany({ author: id }).then((data) => {
          res.send({
            message: `User was deleted successfully. ${data.deletedCount} Posts of this user were deleted successfully!`,
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error deleting User with id=" + id,
      });
    });
}

function confirmPwd(req, res) {
  const pwd = req.body.password;
  res.locals.currentUser.checkPassword(pwd, function (err, isMatch) {
    if (err) {
      res.status(500).send({ message: err.message });
    }

    if (isMatch) {
      res.send({ result: true });
    } else {
      res.send({ result: false });
    }
  });
}

const controller = {
  create,
  findOne,
  findAll,
  update,
  remove,
  getById,
  confirmPwd,
};

export default controller;

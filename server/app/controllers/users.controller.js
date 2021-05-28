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
    .save(user)
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
      for (let user of users) {
        await user.populate("posts").execPopulate();
      }
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
  if (!res.body) {
    res.status(400).send({
      message: "Data to update cannot be empty",
    });
    return false;
  }

  const id = req.params.id;

  User.findByIdAndModify(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe Post was not found!`,
        });
        return false;
      } else {
        res.send({ message: "User was updated successfully." });
        return true;
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating User with id=" + id,
      });
      return false;
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
        res.send({ message: "User was deleted successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error deleting User with id=" + id,
      });
    });
}

const controller = {
  create,
  findOne,
  findAll,
  update,
  remove,
  getById,
};

export default controller;

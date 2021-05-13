import db from "../models/models.js";
import { getPagination } from "./pagination.js";

const Post = db.posts;

export function create(req, res) {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Post
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    text: req.body.text,
    photos: req.body.photos,
    author: req.body.authorId,
  });

  //Save in the db
  post
    .save(post)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Pot.",
      });
    });
}

//Can also specify title filter and author filter
export function findAll(req, res) {
  const { title, author, page, size } = req.query;

  let condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  if (author) {
    condition.author = author;
  }

  const { limit, offset } = getPagination(page, size);

  Post.paginate(condition, { offset, limit })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        tutorials: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
}

export function findOne(req, res) {
  const id = req.body.id;

  Post.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Not found Tutorial with id " + id,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      });
    });
}

export function update(req, res) {
  if (!res.body) {
    res.status(400).send({
      message: "Data to update cannot be empty",
    });
    return;
  }

  const id = req.params.id;

  Post.findByIdAndModify(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Post with id=${id}. Maybe Post was not found!`,
        });
      } else {
        res.send({ message: "Tutorial was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Post with id=" + id,
      });
    });
}

export function remove(req, res) {
  const id = req.params.id;

  Post.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Post with id=${id}. Maybe Post was not found!`,
        });
      } else {
        res.send({ message: "Tutorial was deleted successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting Post with id=" + id,
      });
    });
}

// Can pass author id
export function removeAll(req, res) {
  const authorId = req.body.authorId;
  let condition = authorId ? { author: authorId } : {};

  Post.deleteMeny(condition)
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Posts were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all posts.",
      });
    });
}

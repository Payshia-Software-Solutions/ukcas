const { Comment } = require("../models/index");

const commentController = {
  async createComment(req, res) {
    try {
      const comment = await Comment.create(req.body);
      res.status(201).json(comment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAllComments(req, res) {
    try {
      const comments = await Comment.findAll();
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getComment(req, res) {
    try {
      const comment = await Comment.findByPk(req.params.id);
      if (!comment) return res.status(404).json({ error: "Comment not found" });
      res.json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateComment(req, res) {
    try {
      const comment = await Comment.findByPk(req.params.id);
      if (!comment) return res.status(404).json({ error: "Comment not found" });
      await comment.update(req.body);
      res.json(comment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteComment(req, res) {
    try {
      const comment = await Comment.findByPk(req.params.id);
      if (!comment) return res.status(404).json({ error: "Comment not found" });
      await comment.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = commentController;

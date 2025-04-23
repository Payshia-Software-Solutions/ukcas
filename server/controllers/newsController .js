const { News } = require("../models/index");

const newsController = {
  async createNews(req, res) {
    try {
      const news = await News.create(req.body);
      res.status(201).json(news);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAllNews(req, res) {
    try {
      const newsList = await News.findAll();
      res.json(newsList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getNews(req, res) {
    try {
      const news = await News.findByPk(req.params.id);
      if (!news) return res.status(404).json({ error: "News item not found" });
      res.json(news);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateNews(req, res) {
    try {
      const news = await News.findByPk(req.params.id);
      if (!news) return res.status(404).json({ error: "News item not found" });
      await news.update(req.body);
      res.json(news);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteNews(req, res) {
    try {
      const news = await News.findByPk(req.params.id);
      if (!news) return res.status(404).json({ error: "News item not found" });
      await news.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = newsController;

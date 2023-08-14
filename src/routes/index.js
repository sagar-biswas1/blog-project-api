const router = require('express').Router()
const { controllers : articlesControllers} =require('../api/v1/article')

router
.route("/api/v1/articles")
.get(articlesControllers.findAll)
.post(articlesControllers.create)

router
.route("/api/v1/articles/:id")
.put(articlesControllers.updateItem)
.get(articlesControllers.findByID)
.patch(articlesControllers.updateItemPatch)
.delete(articlesControllers.removeItem)

module.exports = router
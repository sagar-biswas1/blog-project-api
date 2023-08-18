const router = require('express').Router()
const { controllers : articlesControllers} =require('../api/v1/article')
const { controllers : articlesControllersV2} =require('../api/v2/article')

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


router
.route("/api/v2/articles/:id")
// .put(articlesControllers.updateItem)
// .get(articlesControllers.findByID)
.patch(articlesControllersV2.updateItemPatch)
// .delete(articlesControllers.removeItem)

module.exports = router
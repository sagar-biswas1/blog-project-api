const router = require('express').Router()
const { controllers : articlesControllers} =require('../api/v1/article')

router
.route("/api/v1/articles")
.get(articlesControllers.findAll)
.post(articlesControllers.create)

router
.route("/api/v1/articles/:id")
.put((req,res)=>{})
.get(articlesControllers.findByID)
.patch((req,res)=>{})
.delete((req,res)=>{})

module.exports = router
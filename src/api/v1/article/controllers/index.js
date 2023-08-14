const findAll = require('./findAll')
const create = require('./create')
const findByID= require('./findSingleItem')
const updateItem= require("./updateItem")
const updateItemPatch= require("./updateItemPatch")
const removeItem= require("./removeItem")

module.exports ={
    findAll,
    create,
    findByID,
    updateItem,
    updateItemPatch,
    removeItem
}

// const express = require('express')
// const router=express.Router()

const router = require('express').Router()
const appController = require('../controller/student.controller')

router.get('/', appController.index)
router.post('/insert', appController.insert)
router.get('/student-view', appController.studentView)
router.get('/delete/:id', appController.delete)
router.get('/edit/:id', appController.edit)
router.post('/update', appController.update)

module.exports = router

const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookcontroller');

router.post('/add_book/',bookController.createBook)

router.get('/get_all_books/',bookController.getallbooks)

router.delete('/delete_book_id/:id',bookController.deletebookbyid)

router.get('/get_book_id/:id',bookController.getbookbyid)

router.put('/update_book_id/:id',bookController.updatebookbyid)

router.post('/login',bookController.login)

router.post('/signup',bookController.signup)

module.exports = router


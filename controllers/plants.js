const express = require('express');
const router = express.Router();

//I
router.get('/', (req, res) => {
    res.render('plants/index.ejs');
});

//N
router.get('/new', (req, res) => {
    res.render('plants/new.ejs');
});

//D
//U
//C
//E
//S

module.exports = router;
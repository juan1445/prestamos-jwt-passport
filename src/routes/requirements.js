const express = require('express');
const router = express.Router();

router.get('/requirements', async (req,res) => {
    res.render('partials/requirements')
})

module.exports = router;
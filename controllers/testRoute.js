const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Marc heeft een MVC route gemaakt");
})

module.exports = router;
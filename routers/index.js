const { application } = require('express');

const router = require('express').Router();

router.get('/', (req,res)=>{
    res.send("AMAN")
})


module.exports = router;
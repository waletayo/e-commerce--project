const express = require('express');
const permission=require('./permission-controller');
const router = express.Router();


router.post('/permission',permission.create);
router.get('/permission',permission.find);
router.get('/permissions/:id', permission.findOne);

module.exports=router;

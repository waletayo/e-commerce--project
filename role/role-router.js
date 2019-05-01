// import {Router} from 'express';
// import {create, find, findOne,softDelete} from "./role-controller";
const exprress= require('express');
const router= express.Router();
const roles=require('./role-controller');

router.post('/post',roles.create);
router.get('/find',roles.find);

router.get('/roles/:id',roles.findOne);

router.delete('/roles/:id', roles.softDelete);
module.exports=router;


const express = require('express');
const { current } = require('../middlewares/auth'); 
const { authorize } = require('../middlewares/authorization');

const router = express.Router();

router.post('/', current, authorize('admin'), (req,res)=>{});
router.put('/:pid', current, authorize('admin'), (req,res)=>{});
router.delete('/:pid', current, authorize('admin'), (req,res)=>{});

module.exports = router;

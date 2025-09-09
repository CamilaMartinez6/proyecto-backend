const express = require('express');
const { current } = require('../middlewares/auth');
const { authorize } = require('../middlewares/authorization');

const router = express.Router();

router.post('/:cid/products/:pid', current, authorize('user'), (req,res)=>{});

module.exports = router;

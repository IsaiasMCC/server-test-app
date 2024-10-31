const  { Router } = require('express');
const router = Router();

router.get('/', (req, res)=>{
    res.send('HOME PAGE');
});

module.exports = router;
const express = require('express');
const { addAdmin, loginAdmin, getAllAdmin, singleAdmin } = require('../../controller/admin/adminController');
const route = express.Router();


route.post('/signup', addAdmin)
route.post('/login', loginAdmin)
route.get('/getalladmin', getAllAdmin)
route.get('/getoneadmin/:id', singleAdmin)

module.exports= route;
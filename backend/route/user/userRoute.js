const express = require('express');
const { fetchAllUsers, addNewUser, updateUser, deleteUser, loginUser } = require('../../controller/user/userController');

const route = express.Router();

route.get('/allusers', fetchAllUsers);
route.post('/signup', addNewUser);
route.put('/updateuser/:id', updateUser)
route.delete('/deleteuser/:id', deleteUser)
route.post('/login', loginUser);

module.exports = route;
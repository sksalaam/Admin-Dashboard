const express = require('express');

const router = express.Router();

const {upload} = require('../../Helpers/Cloudinary');

const {handleImageUpload, addEmployee, deleteEmployee, editEmployee, searchEmployees, getAllEmployees} = require ('../../Controllers/EmployeeController');

router.post('/upload-image', upload.single('my_file'), handleImageUpload);

router.post('/add-employee', addEmployee);

router.delete('/delete-employee/:id', deleteEmployee);

router.put('/edit-employee/:id', editEmployee);

router.get('/search-employees/:query', searchEmployees);

router.get('/employees', getAllEmployees);





module.exports = router; 
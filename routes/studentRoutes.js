const router = require('express').Router();
const Controller = require('../controller/studentController');

router.get('/', Controller.GetAllStudents);
router.post('/new', Controller.AddNewStudent);
router.post('/bulk', Controller.AddBulkStudents);
router.put('/updateByID/:id', Controller.UpdateStudentByID);
router.delete('/deleteAllStudent', Controller.DeleteAllStudents);
router.delete('/deleteStudentById/:id', Controller.DeleteAllStudentByID);

module.exports = router
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');

router.get('/', employeeController.getAllEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.post('/', employeeController.createEmployee);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);
router.delete('/:id/:cellphone', employeeController.deleteCellphone);
router.post('/:id/cellphone', employeeController.addCellphone);
router.get('/api/branch/:id', employeeController.getEmployeeByBranch);

module.exports = router;
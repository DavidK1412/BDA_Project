const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branch.controller');


router.get('/', branchController.getAllBranches);
router.get('/:id', branchController.getBranchById);

module.exports = router;
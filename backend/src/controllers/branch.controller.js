const branchService = require('../services/branch.service');

const getAllBranches = async (req, res) => {
    const branches = await branchService.getAllBranches();
    return res.status(200).json(branches);
}

const getBranchById = async (req, res) => {
    const id = req.params.id;
    const branch = await branchService.getBranchById(id);
    return res.status(200).json(branch);
}


module.exports = {
    getAllBranches,
    getBranchById
}
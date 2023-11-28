const pgClient = require("../config/db.config");

const getBranchById = async (id) => {
    const response = await pgClient.query(
        "SELECT * FROM sucursal WHERE id = $1", [id]
    )
    return response.rows;
}

const getAllBranches = async () => {
    const response = await pgClient.query("SELECT * FROM sucursal");
    return response.rows;
}

module.exports = {
    getBranchById,
    getAllBranches
}
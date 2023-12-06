const pgClient = require("../config/db.config");

const getNewClients = async (month, year) => {
    const response = await pgClient.query(
        "SELECT * FROM consolidado_clientes_nuevos($1, $2)", [month, year]
    )
    return response.rows;
}

const getMostSoldBrands = async (status, month, year) => {
    const response = await pgClient.query(
        "SELECT * FROM consolidado_mensual_anual($1, $2, $3)", [status, month, year]
    )
    return response.rows;
}

const getDetailedNewClients = async (month, year) => {
    const response = await pgClient.query(
        "SELECT * FROM datos_clientes_nuevos($1, $2)", [month, year]
    )
    // Da formato YYYY-MM-DD a la fecha
    for (const row of response.rows) {
        row.fechaingreso = row.fechaingreso.toISOString().split('T')[0];
    }
    return response.rows;
}

const getMostNewBrands = async (month, year) => {
    const response = await pgClient.query(
        "SELECT * FROM marca_carros_nuevos($1, $2)", [month, year]
    )
    return response.rows;
}

const getEmployeeDetailed = async() => {
    const response = await pgClient.query(
        "SELECT * FROM datos_empleados()"
    )
    // Da formato YYYY-MM-DD a la fecha
    for (const row of response.rows) {
        row.fechanacimiento = row.fechanacimiento.toISOString().split('T')[0];
        row.fechaingreso = row.fechaingreso.toISOString().split('T')[0];
    }
    return response.rows;
}

module.exports = {
    getDetailedNewClients,
    getMostNewBrands,
    getEmployeeDetailed,
    getNewClients,
    getMostSoldBrands
};
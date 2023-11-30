const pgClient = require('../config/db.config');

const getAllSales = async () => {
    const sales = await pgClient.query('SELECT * FROM compra');
    return sales.rows;
}

const getSaleById = async (id) => {
    const sale = await pgClient.query('SELECT * FROM compra WHERE id = $1', [id]);
    return sale.rows[0];
}

const createSale = async (sale) => {
    const { id,  fecha, id_cliente, id_auto, id_empleado } = sale;
    const newSale = await pgClient.query('INSERT INTO compra (id, fecha, id_cliente, id_auto, id_empleado) VALUES ($1, $2, $3, $4, $5)', [id, fecha, id_cliente, id_auto, id_empleado]);
    return newSale;
}

const getSaleByClientId = async (id) => {
    const sale = await pgClient.query('SELECT * FROM compra WHERE id_cliente = $1', [id]);
    return sale.rows;
}

const getSalesByEmployeeId = async (id) => {
    const sale = await pgClient.query('SELECT * FROM compra WHERE id_empleado = $1', [id]);
    return sale.rows;
}

const getSalesByBranchId = async (id) => {
    const sale = await pgClient.query(
        'SELECT * FROM compra WHERE id_empleado IN (SELECT codigo FROM empleado WHERE id_sucursal = $1)',
        [id]
    )
    return sale.rows;
}

module.exports = {
    getAllSales,
    getSaleById,
    createSale,
    getSaleByClientId,
    getSalesByEmployeeId,
    getSalesByBranchId
}
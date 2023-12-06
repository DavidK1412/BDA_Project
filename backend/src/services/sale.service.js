const autoService = require('../services/auto.service');
const clientService = require('../services/client.service');
const employeeService = require('../services/employee.service');
const pgClient = require('../config/db.config');

const getAllSales = async () => {
    const sales = await pgClient.query('SELECT * FROM compra');
    return sales.rows;
}

const getSaleById = async (id) => {
    const sale = await pgClient.query('SELECT * FROM compra WHERE id = $1', [id]);
    const auto = await autoService.getAutoById(sale.rows[0].id_auto);
    sale.rows[0].auto = auto;
    sale.rows[0].fecha = sale.rows[0].fecha.toISOString().split('T')[0];
    sale.rows[0].detailedAuto = sale.rows[0].auto.marca.nombre + " " + sale.rows[0].auto.linea.nombre + " " + sale.rows[0].auto.modelo;
    return sale.rows[0];
}

const createSale = async (sale) => {
    console.log(sale);
    const { id,  fecha, id_cliente, id_auto, id_empleado } = sale;
    const newSale = await pgClient.query('INSERT INTO compra (id, fecha, id_cliente, id_auto, id_empleado) VALUES ($1, $2, $3, $4, $5)', [id, fecha, id_cliente, id_auto, id_empleado]);
    return newSale;
}

const getSaleByClientId = async (id) => {
    const sale = await pgClient.query('SELECT * FROM compra WHERE id_cliente = $1', [id]);
    // recorre el arreglo de ventas y agrega el auto a cada venta
    for (const s of sale.rows) {
        const client = await clientService.getClientById(s.id_cliente);
        const auto = await autoService.getAutoById(s.id_auto);
        s.fecha = s.fecha.toISOString().split('T')[0];
        s.detailedAuto = s.auto.marca.nombre + " " + s.auto.linea.nombre + " " + s.auto.modelo;
        s.auto = auto;
        s.cliente = client;
    }
    return sale.rows;
}

const getSalesByEmployeeId = async (id) => {
    const sale = await pgClient.query('SELECT * FROM compra WHERE id_empleado = $1', [id]);
    for (const s of sale.rows) {
        const client = await clientService.getClientById(s.id_cliente);
        const auto = await autoService.getAutoById(s.id_auto);
        s.fecha = s.fecha.toISOString().split('T')[0];
        s.auto = auto;
        s.cliente = client;
        s.detailedAuto = s.auto.marca.nombre + " " + s.auto.linea.nombre + " " + s.auto.modelo;
    }
    return sale.rows;
}

const getSalesByBranchId = async (id) => {
    const sale = await pgClient.query(
        'SELECT * FROM compra WHERE id_empleado IN (SELECT codigo FROM empleado WHERE id_sucursal = $1)',
        [id]
    )
    for (const s of sale.rows) {
        const client = await clientService.getClientById(s.id_cliente);
        const auto = await autoService.getAutoById(s.id_auto);
        const vendedor = await employeeService.getEmployeeById(s.id_empleado);
        s.fecha = s.fecha.toISOString().split('T')[0];
        s.auto = auto;
        s.cliente = client;
        s.vendedor = vendedor;
        s.detailedAuto = s.auto.marca.nombre + " " + s.auto.linea.nombre + " " + s.auto.modelo;
    }
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
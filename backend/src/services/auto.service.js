const pgClient = require("../config/db.config");

const colorService = require("./color.service");
const lineService = require("./line.service");
const brandService = require("./brand.service");
const branchService = require("./branch.service");

const getAllAutos = async () => {
    const response = await pgClient.query("SELECT * FROM Automotores");
    return response.rows;
}

const getAutoById = async (id) => {
    const response = await pgClient.query(
        "SELECT * FROM automotor WHERE id = $1", [id]
    )
    const auto = response.rows[0];
    const color = await colorService.getColorById(auto.id_color);
    const line = await lineService.getLineById(auto.id_linea);
    const branch = await branchService.getBranchById(auto.id_sucursal);
    const brand = await brandService.getBrandById(line.id_marca);
    let tipos = {
        1: "Camion",
        2: "Camioneta",
        3: "Automovil",
    }
    auto.color = color;
    auto.linea = line;
    auto.marca = brand;
    auto.sucursal = branch;
    auto.tipo = tipos[auto.id_tipo];
    return auto;
}

const getUsedAutos = async () => {
    const response = await pgClient.query(
        "SELECT * FROM usados"
    )
    const autos = [];
    // Iterate over the response
    for (const res of response.rows) {
        const auto = await getAutoById(res.id_auto);
        auto.placa = res.placa;
        autos.push(auto);
    }

    return autos;
}

const getNewAutos = async () => {
    const response = await pgClient.query(
        "SELECT * FROM nuevos"
    )
    // Create an array of autos
    const autos = [];
    // Iterate over the response
    for (const res of response.rows) {
        const auto = await getAutoById(res.id_auto);
        auto.id_interno = res.id_interno;
        autos.push(auto);
    }

    return autos;
}

const createAuto = async (auto) => {
    const { id, modelo, chasis, valor, id_color, id_linea, id_tipo, id_sucursal, id_marca } = auto;
    return await pgClient.query(
        // Inserta id, modelo, chasis, valor, id_color, id_linea, id_tipo, id_sucursal, id_marca
        "INSERT INTO automotor(id, modelo, chasis, valor, id_color, id_linea, id_tipo, id_sucursal, id_marca) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [id, modelo, chasis, valor, id_color, id_linea, id_tipo, id_sucursal, id_marca]
    );
}

const setUsedAuto = async (id_auto, placa) => {
    return await pgClient.query(
        "INSERT INTO usados (id_auto, placa) VALUES ($1, $2)", [id_auto.id_auto, id_auto.placa]
    );
}

const setNewAuto = async (id_auto) => {
    return await pgClient.query(
        "INSERT INTO nuevos (id_auto) VALUES ($1)", [id_auto.id_auto]
    );
}

const updateAuto = async (id, auto) => {
    const { modelo, chasis, valor, id_color, id_linea, id_tipo, id_sucursal } = auto;
    return await pgClient.query(
        "UPDATE automotor SET modelo = $1, chasis = $2, valor = $3, id_color = $4, id_linea = $5, id_tipo = $6, id_sucursal = $7 WHERE id = $8", [modelo, chasis, valor, id_color, id_linea, id_tipo, id_sucursal, id]
    );
}

const deleteAuto = async (id) => {
    return await pgClient.query(
        "DELETE FROM automotor WHERE id = $1", [id]
    );
}


module.exports = {
    getAllAutos,
    getAutoById,
    getUsedAutos,
    getNewAutos,
    createAuto,
    updateAuto,
    deleteAuto,
    setUsedAuto,
    setNewAuto
};
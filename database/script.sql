CREATE DATABASE BuenAutoDB;

\c buenautodb;

CREATE TABLE Ciudad
(
    id     VARCHAR(36) NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL
);

ALTER TABLE Ciudad ADD PRIMARY KEY (id);

CREATE TABLE Sucursal
(
    id     VARCHAR(36) NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    ciudad VARCHAR(36) NOT NULL
    
);

ALTER TABLE Sucursal ADD PRIMARY KEY (id);

ALTER TABLE Sucursal ADD CONSTRAINT fk_Ciudad FOREIGN KEY (ciudad) REFERENCES Ciudad (id);

CREATE TABLE Cargo
(
    id     INT,
    nombre VARCHAR(50) NOT NULL
);

ALTER TABLE Cargo ADD PRIMARY KEY (id);


CREATE TABLE Empleado
(
    codigo           VARCHAR(15) NOT NULL UNIQUE,
    cedula           VARCHAR(12) NOT NULL,
    nombre           VARCHAR(50) NOT NULL,
    salario          REAL        NOT NULL,
    fecha_nacimiento DATE        NOT NULL,
    fecha_ingreso    DATE        NOT NULL,
    id_cargo         INT         NOT NULL,
    id_sucursal      VARCHAR(36) NOT NULL

);

ALTER TABLE Empleado ADD PRIMARY KEY (codigo);

ALTER TABLE Empleado ADD CONSTRAINT fk_Cargo FOREIGN KEY (id_cargo) REFERENCES Cargo (id) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE Empleado ADD CONSTRAINT fk_Sucursal FOREIGN KEY (id_sucursal) REFERENCES Sucursal (id) ON DELETE CASCADE ON UPDATE CASCADE;   

CREATE TABLE Telefono_Empleado
(
    numero          VARCHAR(15) NOT NULL,
    codigo_empleado VARCHAR(15) NOT NULL
    
);

ALTER TABLE Telefono_Empleado ADD PRIMARY KEY (numero,codigo_empleado);

ALTER TABLE Telefono_Empleado ADD CONSTRAINT fk_empleado FOREIGN KEY (codigo_empleado) REFERENCES Empleado (codigo) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE Usuario
(
    id              VARCHAR(36)  NOT NULL UNIQUE,
    codigo_empleado VARCHAR(15)  NOT NULL,
    usuario         VARCHAR(50)  NOT NULL,
    contrasena      VARCHAR(256) NOT NULL
);

ALTER TABLE Usuario ADD PRIMARY KEY (id);

ALTER TABLE Usuario ADD CONSTRAINT fk_empleado FOREIGN KEY (codigo_empleado) REFERENCES Empleado (codigo) ON DELETE CASCADE ON UPDATE CASCADE; 

CREATE TABLE Cliente
(
    cedula      VARCHAR(12) NOT NULL UNIQUE,
    nombre      VARCHAR(50) NOT NULL,
    id_ciudad   VARCHAR(36) NOT NULL,
    id_sucursal VARCHAR(36)
);

ALTER TABLE Cliente ADD PRIMARY KEY (cedula);

ALTER TABLE Cliente ADD CONSTRAINT fk_ciudad FOREIGN KEY (id_ciudad) REFERENCES Ciudad (id) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE Cliente ADD CONSTRAINT fk_sucursal FOREIGN KEY (id_sucursal) REFERENCES Sucursal (id) ON DELETE SET NULL ON UPDATE CASCADE; 

CREATE TABLE Telefono_Cliente
(
    numero         VARCHAR(15) NOT NULL,
    cedula_cliente VARCHAR(12) NOT NULL
);

ALTER TABLE Telefono_Cliente ADD PRIMARY KEY (numero, cedula_cliente);

ALTER TABLE Telefono_Cliente ADD CONSTRAINT fk_cliente FOREIGN KEY (cedula_cliente) REFERENCES Cliente (cedula) ON DELETE CASCADE ON UPDATE CASCADE; 

CREATE TABLE Linea
(
    id     VARCHAR(36) NOT NULL,
    nombre VARCHAR(50) NOT NULL
);

ALTER TABLE Linea ADD PRIMARY KEY (id);

CREATE TABLE Color
(
    id     VARCHAR(36) NOT NULL,
    nombre VARCHAR(50) NOT NULL
);

ALTER TABLE Color ADD PRIMARY KEY (id);

CREATE TABLE Tipo
(
    id     INT 	       NOT NULL,
    nombre VARCHAR(50) NOT NULL
);

ALTER TABLE Tipo ADD PRIMARY KEY (id);

CREATE TABLE Marca
(
	id     INT         NOT NULL UNIQUE,
	nombre VARCHAR(50) NOT NULL
);

ALTER TABLE Marca ADD PRIMARY KEY (id);

CREATE TABLE AutoMotor
(
    id          VARCHAR(36) NOT NULL UNIQUE,
    modelo      VARCHAR(4)  NOT NULL,
    chasis      VARCHAR(20) NOT NULL,
    valor       REAL        NOT NULL,
    id_color    VARCHAR(36) NOT NULL,
    id_linea    VARCHAR(36) NOT NULL,
    id_tipo     INT         NOT NULL,
    id_sucursal VARCHAR(36) NOT NULL,
    id_marca    INT         NOT NULL
);

ALTER TABLE AutoMotor ADD PRIMARY KEY (id);

ALTER TABLE AutoMotor ADD CONSTRAINT fk_color FOREIGN KEY (id_color) REFERENCES Color (id) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE AutoMotor ADD CONSTRAINT fk_linea FOREIGN KEY (id_linea) REFERENCES Linea (id) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE AutoMotor ADD CONSTRAINT fk_tipo FOREIGN KEY (id_tipo) REFERENCES Tipo (id) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE AutoMotor ADD CONSTRAINT fk_sucursal FOREIGN KEY (id_sucursal) REFERENCES Sucursal (id) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE AutoMotor ADD CONSTRAINT fk_marca FOREIGN KEY (id_marca) REFERENCES Marca (id) ON DELETE SET NULL ON UPDATE CASCADE;


CREATE TABLE Usados(
    id_auto VARCHAR(36)NOT NULL,
    placa   VARCHAR(6) NOT NULL UNIQUE

);

ALTER TABLE Usados ADD PRIMARY KEY (id_auto,placa);

ALTER TABLE Usados ADD CONSTRAINT fk_auto FOREIGN KEY (id_auto) REFERENCES AutoMotor (id) ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE Nuevos(
    id_auto    VARCHAR(36) NOT NULL,
    id_interno VARCHAR(10) NOT NULL
);

ALTER TABLE Nuevos ADD PRIMARY KEY (id_auto, id_interno);

ALTER TABLE Nuevos ADD CONSTRAINT fk_auto FOREIGN KEY (id_auto) REFERENCES AutoMotor (id) ON DELETE SET NULL ON UPDATE CASCADE;

	
CREATE TABLE Compra(
    id          VARCHAR(36) NOT NULL UNIQUE,
    fecha       DATE        NOT NULL,
    id_cliente  VARCHAR(12) NOT NULL,
    id_auto     VARCHAR(36) NOT NULL,
    id_empleado VARCHAR(15) NOT NULL
);

ALTER TABLE Compra ADD PRIMARY KEY (id);

ALTER TABLE Compra ADD CONSTRAINT fk_cliente FOREIGN KEY (id_cliente) REFERENCES Cliente (cedula) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE Compra ADD CONSTRAINT fk_auto FOREIGN KEY (id_auto) REFERENCES AutoMotor (id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE Compra ADD CONSTRAINT fk_empleado FOREIGN KEY (id_empleado) REFERENCES Empleado (codigo) ON DELETE CASCADE ON UPDATE CASCADE;

--- Trigger para generar el codigo del empleado
CREATE OR REPLACE FUNCTION generar_codigo_empleado()
    RETURNS TRIGGER AS
$$
DECLARE
    codigo VARCHAR(15);
BEGIN
    codigo := NEW.cedula || SUBSTRING(NEW.nombre, 1, 1) || SUBSTRING(NEW.nombre, 2, 1);
    NEW.codigo := codigo;
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER generar_codigo_empleado
    BEFORE INSERT
    ON Empleado
    FOR EACH ROW
    EXECUTE PROCEDURE generar_codigo_empleado();

--Muestra el empleado y el usuario
CREATE VIEW Empleados_Username AS
    SELECT
        u.usuario AS usuario,
        e.codigo AS codigo,
        e.cedula AS cedula,
        e.nombre AS nombre,
        e.salario AS salario,
        e.fecha_nacimiento AS fecha_nacimiento,
        e.fecha_ingreso AS fecha_ingreso,
        e.id_cargo AS id_cargo,
        e.id_sucursal AS id_sucursal
    FROM
        Usuario u,
        Empleado e
    WHERE
        u.codigo_empleado = e.codigo;

SELECT * FROM Empleados_Username;



--Clientes nuevos asignados a la sucursal de su primera compra

CREATE OR REPLACE FUNCTION asignar_sucursal_cliente_nuevo() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.id_cliente IS NOT NULL AND (SELECT id_sucursal FROM Cliente WHERE cedula = NEW.id_cliente) IS NULL THEN
        UPDATE Cliente SET id_sucursal = (SELECT id_sucursal FROM Empleado WHERE codigo = NEW.id_empleado) WHERE cedula = NEW.id_cliente;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_asignar_sucursal_cliente_nuevo
AFTER INSERT ON Compra
FOR EACH ROW
EXECUTE FUNCTION asignar_sucursal_cliente_nuevo();

--Consolidado mensual de la cantidad de clientes nuevos a nivel nacional

SELECT
    EXTRACT(YEAR FROM c.fecha) AS anio,
    EXTRACT(MONTH FROM c.fecha) AS mes,
    COUNT(DISTINCT c.id_cliente) AS cantidad_clientes_nuevos
FROM Compra c
JOIN Cliente cl ON c.id_cliente = cl.cedula
WHERE cl.cedula NOT IN (
    SELECT cl2.cedula
    FROM Cliente cl2
    JOIN Compra c2 ON cl2.cedula = c2.id_cliente
    WHERE EXTRACT(MONTH FROM c2.fecha) < EXTRACT(MONTH FROM c.fecha)
        AND EXTRACT(YEAR FROM c2.fecha) = EXTRACT(YEAR FROM c.fecha)
)
GROUP BY anio, mes
ORDER BY anio, mes;

--Consolidado mensual y anual de la marca de la cual se han vendido más automotores en cada sucursal, permitiendo clasificarlos en nuevos o usados.

SELECT
    s.nombre AS Sucursal,
    EXTRACT(YEAR FROM c.fecha) AS Anio,
    EXTRACT(MONTH FROM c.fecha) AS Mes,
    CASE
        WHEN u.id_auto IS NOT NULL THEN 'Usado'
        ELSE 'Nuevo'
    END AS Estado,
    a.id_marca AS Marca,
    COUNT(*) AS CantidadVentas
FROM Compra c
INNER JOIN AutoMotor a ON c.id_auto = a.id
LEFT JOIN Usados u ON a.id = u.id_auto
JOIN Sucursal s ON a.id_sucursal = s.id  
WHERE c.fecha IS NOT NULL
GROUP BY Sucursal, Anio, Mes, Estado, Marca
ORDER BY Sucursal, Anio, Mes, Estado, CantidadVentas DESC
LIMIT 1;

--Datos de los clientes nuevos. Estos datos organizados por sucursal en un mes particular.

SELECT
    cl.id_sucursal,
    EXTRACT(MONTH FROM co.fecha) AS mes,
    co.id_cliente,
    cl.nombre AS nombre_cliente,
    cl.id_ciudad,
    cl.id_sucursal AS sucursal_cliente
FROM Compra co
JOIN Cliente cl ON co.id_cliente = cl.cedula
WHERE NOT EXISTS (
    SELECT 1
    FROM Compra co2
    WHERE co2.id_cliente = co.id_cliente
      AND EXTRACT(MONTH FROM co2.fecha) < EXTRACT(MONTH FROM co.fecha)
      AND EXTRACT(YEAR FROM co2.fecha) = EXTRACT(YEAR FROM co.fecha)
)
ORDER BY cl.id_sucursal, EXTRACT(MONTH FROM co.fecha), co.id_cliente;


--Marca de carros nuevos más comprados en un mes particular a nivel nacional por cada sucursal.

SELECT
    a.id_sucursal,
    EXTRACT(MONTH FROM c.fecha) AS mes,
    FIRST_VALUE(t.nombre) OVER (PARTITION BY a.id_sucursal, EXTRACT(MONTH FROM c.fecha) ORDER BY COUNT(*) DESC) AS marca_mas_comprada,
    MAX(COUNT(*)) OVER (PARTITION BY a.id_sucursal, EXTRACT(MONTH FROM c.fecha)) AS cantidad_maxima_ventas
FROM Compra c
JOIN AutoMotor a ON c.id_auto = a.id
JOIN Nuevos n ON a.id = n.id_auto
JOIN Tipo t ON a.id_tipo = t.id
WHERE EXTRACT(MONTH FROM c.fecha) = 1 -- Reemplaza con el mes particular que desees
AND EXTRACT(YEAR FROM c.fecha) = 2022 -- Reemplaza con el año particular que desees
GROUP BY a.id_sucursal, EXTRACT(MONTH FROM c.fecha), t.nombre
ORDER BY a.id_sucursal, mes;

--Datos de los empleados a nivel nacional organizados por sucursal y por cargo de tal forma que sea posible identificar el empleado con mayor y menor antigüedad.

SELECT
    id_sucursal,
    nombre_cargo,
    MAX(nombre_empleado) AS empleado_mayor_antiguedad,
    MAX(fecha_ingreso) AS fecha_ingreso_mayor_antiguedad,
    MIN(nombre_empleado) AS empleado_menor_antiguedad,
    MIN(fecha_ingreso) AS fecha_ingreso_menor_antiguedad
FROM (
    SELECT
        e.id_sucursal,
        c.nombre AS nombre_cargo,
        e.nombre AS nombre_empleado,
        e.fecha_ingreso,
        RANK() OVER (PARTITION BY e.id_sucursal, e.id_cargo ORDER BY e.fecha_ingreso ASC) AS ranking_asc,
        RANK() OVER (PARTITION BY e.id_sucursal, e.id_cargo ORDER BY e.fecha_ingreso DESC) AS ranking_desc
    FROM Empleado e
    JOIN Cargo c ON e.id_cargo = c.id
) AS subquery
WHERE 1 IN (ranking_asc, ranking_desc)
GROUP BY id_sucursal, nombre_cargo
ORDER BY id_sucursal, nombre_cargo, fecha_ingreso_menor_antiguedad DESC, fecha_ingreso_mayor_antiguedad DESC;


-- VIEW PARA MOSTRAR
    -- id (Tabla automotor)
    -- modelo (Tabla automotor)
    -- chasis (Tabla automotor)
    -- valor (Tabla automotor)
    -- color (Tabla color, atributo nombre)
    -- marca (Tabla marca, atributo nombre)
    -- linea (Tabla linea, atributo nombre)
    -- tipo (Tabla tipo, atributo nombre)
    -- sucursal (Tabla sucursal, atributo nombre)
    -- estado (Mostrar si es usado o nuevo, dependiendo en que tabla se encuentre)

CREATE VIEW Automotores AS
    SELECT
        a.id AS id,
        a.modelo AS modelo,
        a.chasis AS chasis,
        a.valor AS valor,
        c.nombre AS color,
        m.nombre AS marca,
        l.nombre AS linea,
        t.nombre AS tipo,
        s.nombre AS sucursal,
        CASE
            WHEN u.id_auto IS NOT NULL THEN 'Usado'
            ELSE 'Nuevo'
        END AS estado
    FROM AutoMotor a
    JOIN Color c ON a.id_color = c.id
    JOIN Marca m ON a.id_marca = m.id
    JOIN Linea l ON a.id_linea = l.id
    JOIN Tipo t ON a.id_tipo = t.id
    JOIN Sucursal s ON a.id_sucursal = s.id
    LEFT JOIN Usados u ON a.id = u.id_auto;
-- TRIGGER PARA INSERTAR EN LA TABLA NUEVOS
-- AL INSERTAR EN LA TABLA NUEVOS UN AUTOMOTOR, GENERAR EL ATRIBUTO ID_INTERNO
-- PARA GENERAR ESTE, TOMARA LOS ULTIMOS 8 DIGITOS DEL CHASIS, LE CONCATENARA EL id_tipo Y EL ULTIMO DIGITO DEL MODELO
-- EJ: CHASIS = 123456789, id_tipo = 1, modelo = 2019
-- id_interno = 2345678919

-- Chasis, id_tipo, modelo son los atributos de la tabla AutoMotor

CREATE OR REPLACE FUNCTION generar_id_interno() RETURNS TRIGGER AS $$
DECLARE
    automotor RECORD;
BEGIN
    SELECT chasis, id_tipo, modelo INTO automotor FROM AutoMotor WHERE id = NEW.id_auto;
    NEW.id_interno := SUBSTRING(automotor.chasis, LENGTH(automotor.chasis) - 7) || automotor.id_tipo || SUBSTRING(automotor.modelo::text, LENGTH(automotor.modelo::text));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER generar_id_interno
BEFORE INSERT ON Nuevos
FOR EACH ROW
EXECUTE FUNCTION generar_id_interno();


create function asignar_sucursal_cliente_nuevo() returns trigger
    language plpgsql
as
$$
DECLARE
    sucursal_compra VARCHAR(36);
BEGIN
    IF NEW.id_cliente IS NOT NULL AND (SELECT id_sucursal FROM Cliente WHERE cedula = NEW.id_cliente) IS NULL THEN
        SELECT id_sucursal INTO sucursal_compra FROM Empleado WHERE codigo = NEW.id_empleado;
        UPDATE Cliente SET id_sucursal = sucursal_compra WHERE cedula = NEW.id_cliente;
    END IF;

    RETURN NEW;
END;
$$;

create trigger trigger_asignar_sucursal_cliente_nuevo
    after insert on Compra
    for each row
execute procedure asignar_sucursal_cliente_nuevo();
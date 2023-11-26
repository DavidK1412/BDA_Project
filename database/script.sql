CREATE DATABASE BuenAutoDB;

\c buenautodb;

CREATE TABLE Ciudad
(
    id     VARCHAR(36) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Sucursal
(
    id     VARCHAR(36) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    ciudad VARCHAR(36) NOT NULL,
    FOREIGN KEY (ciudad) REFERENCES Ciudad (id) ON DELETE CASCADE
);

CREATE TABLE Cargo
(
    id     INT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- "CC + Iniciales nombre y apellido" - Ej- CC: 1015993008 David Casallas "1015993008DC"
-- TRIGGER: Codigo = CC + Iniciales nombre y apellido

CREATE TABLE Empleado
(
    codigo           VARCHAR(15) PRIMARY KEY,
    cedula           VARCHAR(12) NOT NULL,
    nombre           VARCHAR(50) NOT NULL,
    salario          REAL        NOT NULL,
    fecha_nacimiento DATE        NOT NULL,
    fecha_ingreso    DATE        NOT NULL,
    id_cargo         INT         NOT NULL,
    id_sucursal      VARCHAR(36) NOT NULL,
    FOREIGN KEY (id_cargo) REFERENCES Cargo (id) ON DELETE CASCADE,
    FOREIGN KEY (id_sucursal) REFERENCES Sucursal (id) ON DELETE CASCADE
);

CREATE TABLE Telefono_Empleado
(
    numero          VARCHAR(15) NOT NULL,
    codigo_empleado VARCHAR(15) NOT NULL,
    PRIMARY KEY (numero, codigo_empleado),
    FOREIGN KEY (codigo_empleado) REFERENCES Empleado (codigo) ON DELETE CASCADE
);

CREATE TABLE Usuario
(
    id              VARCHAR(36) PRIMARY KEY,
    codigo_empleado VARCHAR(15)  NOT NULL,
    usuario         VARCHAR(50)  NOT NULL,
    contrasena      VARCHAR(256) NOT NULL,
    FOREIGN KEY (codigo_empleado) REFERENCES Empleado (codigo) ON DELETE CASCADE
);

CREATE TABLE Cliente
(
    cedula      VARCHAR(12) PRIMARY KEY,
    nombre      VARCHAR(50) NOT NULL,
    id_ciudad   VARCHAR(36) NOT NULL,
    id_sucursal VARCHAR(36) NOT NULL,
    FOREIGN KEY (id_ciudad) REFERENCES Ciudad (id) ON DELETE CASCADE,
    FOREIGN KEY (id_sucursal) REFERENCES Sucursal (id) ON DELETE CASCADE
);

CREATE TABLE Telefono_Cliente
(
    numero         VARCHAR(15) NOT NULL,
    cedula_cliente VARCHAR(12) NOT NULL,
    PRIMARY KEY (numero, cedula_cliente),
    FOREIGN KEY (cedula_cliente) REFERENCES Cliente (cedula) ON DELETE CASCADE
);

CREATE TABLE Linea
(
    id     VARCHAR(36) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Color
(
    id     VARCHAR(36) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Tipo
(
    id     INT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Marca
(
    id     VARCHAR(36) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE AutoMotor
(
    id          VARCHAR(36) PRIMARY KEY,
    modelo      VARCHAR(4),
    chasis      VARCHAR(20) NOT NULL,
    valor      REAL        NOT NULL,
    id_marca    VARCHAR(36) NOT NULL,
    id_color    VARCHAR(36) NOT NULL,
    id_linea    VARCHAR(36) NOT NULL,
    id_tipo     INT         NOT NULL,
    id_sucursal VARCHAR(36) NOT NULL,
    FOREIGN KEY (id_marca) REFERENCES Marca (id) ON DELETE CASCADE,
    FOREIGN KEY (id_color) REFERENCES Color (id) ON DELETE CASCADE,
    FOREIGN KEY (id_linea) REFERENCES Linea (id) ON DELETE CASCADE,
    FOREIGN KEY (id_tipo) REFERENCES Tipo (id) ON DELETE CASCADE,
    FOREIGN KEY (id_sucursal) REFERENCES Sucursal (id) ON DELETE CASCADE
);

-- SELECT * FROM AutoMotor; -- id = askasopda , modelo = 2019, chasis = 123456789, id_marca = 1, id_color = 1, id_linea = 1, id_tipo = 1, id_sucursal = 1
-- id = askasopda , modelo = 2019, chasis = 123456789, marca = "Chevrolet" , color = "Rojo" , linea = "Spark" , tipo = "Sedan" , sucursal = "Bogota", Usado: true

CREATE TABLE Usados(
    id_auto VARCHAR(36),
    placa   VARCHAR(6) NOT NULL,
    FOREIGN KEY (id_auto) REFERENCES AutoMotor (id) ON DELETE CASCADE,
    PRIMARY KEY (id_auto, placa)
);


CREATE TABLE Nuevos(
    id_auto    VARCHAR(36),
    id_interno VARCHAR(10) NOT NULL,
    FOREIGN KEY (id_auto) REFERENCES AutoMotor (id) ON DELETE CASCADE,
    PRIMARY KEY (id_auto, id_interno)
);

CREATE TABLE Compra(
    id          VARCHAR(36) PRIMARY KEY,
    fecha       DATE        NOT NULL,
    id_cliente  VARCHAR(12) NOT NULL,
    id_auto     VARCHAR(36) NOT NULL UNIQUE,
    id_empleado VARCHAR(15) NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES Cliente (cedula) ON DELETE CASCADE,
    FOREIGN KEY (id_auto) REFERENCES AutoMotor (id) ON DELETE CASCADE,
    FOREIGN KEY (id_empleado) REFERENCES Empleado (codigo) ON DELETE CASCADE
);

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

-- Obtiene el Empleado que tiene el usuario 'DavidK1412'
SELECT codigo_empleado FROM Usuario WHERE usuario = 'DavidK1412'
SELECT * FROM Empleado WHERE codigo = (SELECT codigo_empleado FROM Usuario WHERE usuario = 'DavidK1412');

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

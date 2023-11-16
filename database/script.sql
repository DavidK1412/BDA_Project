CREATE DATABASE BuenAutoDB;

\c BuenAutoDB;

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

CREATE TABLE AutoMotor
(
    id          VARCHAR(36) PRIMARY KEY,
    modelo      VARCHAR(4),
    chasis      VARCHAR(20) NOT NULL,
    id_color    VARCHAR(36) NOT NULL,
    id_linea    VARCHAR(36) NOT NULL,
    id_tipo     INT         NOT NULL,
    id_sucursal VARCHAR(36) NOT NULL,
    FOREIGN KEY (id_color) REFERENCES Color (id) ON DELETE CASCADE,
    FOREIGN KEY (id_linea) REFERENCES Linea (id) ON DELETE CASCADE,
    FOREIGN KEY (id_tipo) REFERENCES Tipo (id) ON DELETE CASCADE,
    FOREIGN KEY (id_sucursal) REFERENCES Sucursal (id) ON DELETE CASCADE
);

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
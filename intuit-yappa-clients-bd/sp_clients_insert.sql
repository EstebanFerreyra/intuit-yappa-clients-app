CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_clients_insert`(
    IN p_nombre VARCHAR(100),
    IN p_apellido VARCHAR(100),
    IN p_razon_social VARCHAR(150),
    IN p_cuit VARCHAR(20),
    IN p_fecha_nacimiento DATE,
    IN p_telefono_celular VARCHAR(20),
    IN p_email VARCHAR(150)
)
BEGIN
    INSERT INTO clientes (
        nombre,
        apellido,
        razon_social,
        cuit,
        fecha_nacimiento,
        telefono_celular,
        email,
        fecha_creacion,
        fecha_modificacion
    )
    VALUES (
        p_nombre,
        p_apellido,
        p_razon_social,
        p_cuit,
        p_fecha_nacimiento,
        p_telefono_celular,
        p_email,
        NOW(),
        NOW()
    );
END
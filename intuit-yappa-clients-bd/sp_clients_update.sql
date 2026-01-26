CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_clients_update`(
    IN p_id INT,
    IN p_nombre VARCHAR(100),
    IN p_apellido VARCHAR(100),
    IN p_telefono_celular VARCHAR(20),
    IN p_email VARCHAR(150)
)
BEGIN
    UPDATE clientes
    SET
        nombre = p_nombre,
        apellido = p_apellido,
        telefono_celular = p_telefono_celular,
        email = p_email,
        fecha_modificacion = NOW()
    WHERE id = p_id;
END
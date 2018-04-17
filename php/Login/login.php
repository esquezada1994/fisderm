<?php

include '../../dll/config.php';
include '../../dll/funciones.php';
if (!$mysqli = getConectionDb())
    return errorLogin($MSJ_ERROR_CONEXION);
extract($_POST);
$sql_login = "SELECT 
                    ps.id_personal_sistema,
                    ps.id_persona,
                    ps.usuario,
                    IF(ps.desactivado = 0, 0, 1) AS desactivado,
                    p.nombres,
                    p.apellidos,
                    COUNT(pr.id_modulo) AS modulos
                FROM
                    $DB_NAME.personal_sistema ps
                        INNER JOIN
                    $DB_NAME.personas p ON p.id_persona = ps.id_persona
                        INNER JOIN
                    $DB_NAME.roles_personal rp ON rp.id_personal_sistema = ps.id_personal_sistema
                        INNER JOIN
                    $DB_NAME.permisos pr ON pr.id_rol = rp.id_rol
                WHERE usuario = '$user'
                    AND contrasenia = '$pass'";
$result_login = $mysqli->query($sql_login);
if ($result_login->num_rows > 0) {
    $data = $myrow = $result_login->fetch_assoc();
    if ($data['id_persona'] > 0) {
        if (intval($data['desactivado']) === 0) {
            if ($data['modulos'] > 0) {
                $_SESSION["LOGGED"] = 1;
                $_SESSION["ID_PERSONA"] = $data['id_persona'];
                $_SESSION["ID_PERSONAL_SISTEMA"] = $data['id_personal_sistema'];
                $PERSONA = $data['nombres'] . " " . $data['apellidos'];
                echo json_encode(array('success' => true, 'message' => "BIENVENIDO " . $PERSONA, 'persona' => $PERSONA));
            } else {
                echo json_encode(array('success' => false, 'message' => "EL USUARIO NO CUENTA CON MÓDULOS HABILITADOS, POR FAVOR CONTACTESE CON EL ADMINISTRADOR DEL SISTEMA"));
            }
        } else {
            echo json_encode(array('success' => false, 'message' => "EL USUARIO QUE INGRESÓ SE ENCUENTRA DESHABILITADO, POR FAVOR CONTACTESE CON EL ADMINISTRADOR DEL SISTEMA"));
        }
    } else {
        echo json_encode(array('success' => false, 'message' => "EL USUARIO O CONTRASEÑA INGRESADOS SON INCORRECTOS"));
    }
} else {
    echo json_encode(array('success' => false, 'message' => "EL USUARIO O CONTRASEÑA INGRESADOS SON INCORRECTOS"));
}
$mysqli->close();

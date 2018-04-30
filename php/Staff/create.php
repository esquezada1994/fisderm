<?php

include '../../dll/config.php';
include '../../dll/funciones.php';
$arrayData = array();
$data = json_decode(file_get_contents('php://input'));
if (isset($data)) {
    if (!$mysqli = getConectionDb())
        return;

    (!isset($data->image)) ? $data->image = '' : '';
    $sql_create = "INSERT INTO $DB_NAME.personal_sistema (
            ID_PERSONA,
            ID_DEPARTAMENTO,
            ID_TIPO_SUELDO,
            USUARIO,
            CONTRASENIA,
            SUELDO,
            DESACTIVADO,
            ID_PERSONA_CREO
            ) VALUES (
            $data->idPerson,
            $data->idDepartment,
            $data->idTypeSalary,
            '$data->user', 
            '$data->pass',  
            $data->salary,
            " . (int) $data->disable . ", 
            " . $_SESSION["ID_PERSONA"] . "
    )";
    $res = RUN_SQL($mysqli, $sql_create);
    if (isset($data->arrayRoles)) {
        $data->arrayRoles = json_decode($data->arrayRoles);
        if (count($data->arrayRoles) > 0) {
            $sql_roles = "INSERT INTO $DB_NAME.roles_personal  "
                    . "(ID_ROL, ID_PERSONAL_SISTEMA, DESACTIVADO, ID_PERSONA_CREO) "
                    . "VALUES ";
            foreach ($data->arrayRoles as $r) {
                $sql_roles .= "(" . $r->id . ", " . $res['id'] . ""
                        . ", " . (int) $r->disable . "" . ", " . $_SESSION["ID_PERSONA"] . ""
                        . "),";
            }
            $sql_roles = substr($sql_roles, 0, -1);
            json_encode(RUN_SQL($mysqli, $sql_roles));
        }
    }
    if (isset($data->arraySchedules)) {
        $data->arraySchedules = json_decode($data->arraySchedules);
        if (count($data->arraySchedules) > 0) {
            $sql_schedule = "INSERT INTO $DB_NAME.horario_personal  "
                    . "(ID_HORARIO, ID_PERSONAL_SISTEMA, DESACTIVADO, ID_PERSONA_CREO) "
                    . "VALUES ";
            foreach ($data->arraySchedules as $s) {
                $sql_schedule .= "(" . $s->id . ", " . $res['id'] . ""
                        . ", " . (int) $s->disable . "" . ", " . $_SESSION["ID_PERSONA"] . ""
                        . "),";
            }
            $sql_schedule = substr($sql_schedule, 0, -1);
            json_encode(RUN_SQL($mysqli, $sql_schedule));
        }
    }
    echo json_encode($res);
    $mysqli->close();
} else {
    echo json_encode(array('success' => false, 'message' => "FALTAN PARÁMETROS"));
}
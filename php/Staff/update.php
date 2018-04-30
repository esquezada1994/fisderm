<?php

include '../../dll/config.php';
include '../../dll/funciones.php';
$arrayData = array();
$data = json_decode(file_get_contents('php://input'));
if (isset($data->id)) {
    if (!$mysqli = getConectionDb())
        return;
    extract($_GET);
    $sql_update = "UPDATE $DB_NAME.personal_sistema SET ";
    $sql_update .= (isset($data->idPerson)) ? "ID_PERSONA = $data->idPerson, " : "";
    $sql_update .= (isset($data->idDepartment)) ? "ID_DEPARTAMENTO = $data->idDepartment, " : "";
    $sql_update .= (isset($data->idTypeSalary)) ? "ID_TIPO_SUELDO = $data->idTypeSalary, " : "";
    $sql_update .= (isset($data->user)) ? "USUARIO = '" . preg_replace("[\n|\r|\n\r\t|']", "\\n", $data->user) . "', " : "";
    $sql_update .= (isset($data->pass)) ? "CONTRASENIA = '$data->pass', " : "";
    $sql_update .= (isset($data->salary)) ? "SUELDO = $data->salary, " : "";
    $sql_update .= (isset($data->disable)) ? "DESACTIVADO = $data->disable, " : "";
    $sql_update .= (isset($data->disable)) ? "ID_PERSONA_ELIMINO = " . $_SESSION["ID_PERSONA"] . ", " : "";
    $sql_update .= (isset($data->disable)) ? "FECHA_ELIMINO = NOW(), " : "";
    $sql_update .= 'ID_PERSONA_EDITO =' . $_SESSION["ID_PERSONA"] . ', ';
    $sql_update .= 'FECHA_EDITO = NOW() ';
    $sql_update .= 'WHERE ID_PERSONAL_SISTEMA = ' . $data->id;
    $res = json_encode(RUN_SQL($mysqli, $sql_update));
    if (isset($data->arrayRoles)) {
        $data->arrayRoles = json_decode($data->arrayRoles);
        if (count($data->arrayRoles) > 0) {
            $sql_roles = "INSERT INTO $DB_NAME.roles_personal  "
                    . "(ID_ROL, ID_PERSONAL_SISTEMA, DESACTIVADO, ID_PERSONA_CREO, ID_PERSONA_ELIMINO, FECHA_ELIMINO) "
                    . "VALUES ";
            foreach ($data->arrayRoles as $r) {
                $sql_roles .= "('" . $r->id . "', '" . $data->id . "'"
                        . ", " . (int) $r->disable . "" . ", " . $_SESSION["ID_PERSONA"] . ""
                        . ", " . $_SESSION["ID_PERSONA"] . ", NOW()"
                        . "),";
            }
            $sql_roles = substr($sql_roles, 0, -1);
            $sql_roles .= " ON DUPLICATE KEY UPDATE "
                    . "ID_ROL=VALUES(ID_ROL),"
                    . "ID_PERSONAL_SISTEMA=VALUES(ID_PERSONAL_SISTEMA),"
                    . "DESACTIVADO=VALUES(DESACTIVADO),"
                    . "ID_PERSONA_ELIMINO=VALUES(ID_PERSONA_ELIMINO),"
                    . "FECHA_ELIMINO=VALUES(FECHA_ELIMINO);";
            json_encode(RUN_SQL($mysqli, $sql_roles));
        }
    }
    if (isset($data->arraySchedules)) {
        $data->arraySchedules = json_decode($data->arraySchedules);
        if (count($data->arraySchedules) > 0) {
            $sql_schedule = "INSERT INTO $DB_NAME.horario_personal  "
                    . "(ID_HORARIO, ID_PERSONAL_SISTEMA, DESACTIVADO, ID_PERSONA_CREO, ID_PERSONA_ELIMINO, FECHA_ELIMINO) "
                    . "VALUES ";
            foreach ($data->arraySchedules as $s) {
                $sql_schedule .= "('" . $s->id . "', '" . $data->id . "'"
                        . ", " . (int) $s->disable . "" . ", " . $_SESSION["ID_PERSONA"] . ""
                        . ", " . $_SESSION["ID_PERSONA"] . ", NOW()"
                        . "),";
            }
            $sql_schedule = substr($sql_schedule, 0, -1);
            $sql_schedule .= " ON DUPLICATE KEY UPDATE "
                    . "ID_HORARIO=VALUES(ID_HORARIO),"
                    . "ID_PERSONAL_SISTEMA=VALUES(ID_PERSONAL_SISTEMA),"
                    . "DESACTIVADO=VALUES(DESACTIVADO),"
                    . "ID_PERSONA_ELIMINO=VALUES(ID_PERSONA_ELIMINO),"
                    . "FECHA_ELIMINO=VALUES(FECHA_ELIMINO);";
            json_encode(RUN_SQL($mysqli, $sql_schedule));
        }
    }
    echo json_encode($res);
    $mysqli->close();
} else {
    echo json_encode(array('success' => false, 'message' => "FALTAN PARÁMETROS"));
}
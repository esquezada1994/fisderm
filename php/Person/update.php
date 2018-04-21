<?php

include '../../dll/config.php';
include '../../dll/funciones.php';
$arrayData = array();
$data = json_decode(file_get_contents('php://input'));
if (isset($data->id)) {
    if (!$mysqli = getConectionDb())
        return;
    extract($_GET);
    $sql_update = "UPDATE $DB_NAME.personas SET ";
    $sql_update .= (isset($data->idOccupation)) ? "ID_PROFESION = $data->idOccupation, " : "";
    $sql_update .= (isset($data->idCity)) ? "ID_CIUDAD = $data->idCity, " : "";
    $sql_update .= (isset($data->firstName)) ? "NOMBRES = '" . preg_replace("[\n|\r|\n\r\t|']", "\\n", $data->firstName) . "', " : "";
    $sql_update .= (isset($data->lastName)) ? "APELLIDOS = '" . preg_replace("[\n|\r|\n\r\t|']", "\\n", $data->lastName) . "', " : "";
    $sql_update .= (isset($data->ci)) ? "CEDULA = '$data->ci', " : "";
    $sql_update .= (isset($data->idSex)) ? "GENERO = $data->idSex, " : "";
    $sql_update .= (isset($data->fBorn)) ? "FECHA_NACIMIENTO = '$data->fBorn', " : "";
    $sql_update .= (isset($data->address)) ? "DIRECCION = '" . preg_replace("[\n|\r|\n\r\t|']", "\\n", $data->address) . "', " : "";
    $sql_update .= (isset($data->email)) ? "CORREO = '$data->email', " : "";
    $sql_update .= (isset($data->idTypeBlood)) ? "TIPO_SANGRE = $data->idTypeBlood, " : "";
    $sql_update .= (isset($disable)) ? "DESACTIVADO = $disable, " : "";
    $sql_update .= (isset($disable)) ? "ID_PERSONA_ELIMINO = " . $_SESSION["ID_PERSONA"] . ", " : "";
    $sql_update .= (isset($disable)) ? "FECHA_ELIMINO = NOW(), " : "";
    $sql_update .= 'ID_PERSONA_EDITO =' . $_SESSION["ID_PERSONA"] . ', ';
    $sql_update .= 'FECHA_EDITO = NOW() ';
    $sql_update .= 'WHERE ID_PERSONA = ' . $data->id;
    $res =  json_encode(RUN_SQL($mysqli, $sql_update));
    if (isset($phones)) {
        $phones = json_decode($phones);
        if (count($phones) > 0) {
            $nuevos = false;
            $sql_phones = "INSERT INTO $DB_NAME.telefonos  "
                    . "(ID_TELEFONO, ID_PERSONA, NUMERO, ID_TIPO, DESACTIVADO, ID_PERSONA_CREO, ID_PERSONA_EDITO, FECHA_EDITO, ID_PERSONA_ELIMINO, FECHA_ELIMINO) "
                    . "VALUES ";
            foreach ($phones as $p) {
                if ((bool) $p->new) {
                    $sql_phones .= "(NULL, '" . $data->id . "'"
                            . ", '" . $p->number . "'" . ", " . $p->idType . ""
                            . ", " . (int) $p->disable . "" . ", " . $_SESSION["ID_PERSONA"] . ""
                            . ", " . $_SESSION["ID_PERSONA"] . ", NOW()"
                            . ", NULL, NULL"
                            . "),";
                } else {
                    $sql_phones .= "('" . $p->id . "', '" . $data->id . "'"
                            . ", '" . $p->number . "'" . ", " . $p->idType . ""
                            . ", " . (int) $p->disable . "" . ", " . $_SESSION["ID_PERSONA"] . ""
                            . ", " . $_SESSION["ID_PERSONA"] . ", NOW()"
                            . ", " . $_SESSION["ID_PERSONA"] . ", NOW()"
                            . "),";
                }
            }
            $sql_phones = substr($sql_phones, 0, -1);
            $sql_phones .= " ON DUPLICATE KEY UPDATE ID_TELEFONO=VALUES(ID_TELEFONO),"
                    . "ID_PERSONA=VALUES(ID_PERSONA),"
                    . "NUMERO=VALUES(NUMERO),"
                    . "ID_TIPO=VALUES(ID_TIPO),"
                    . "DESACTIVADO=VALUES(DESACTIVADO),"
                    . "ID_PERSONA_EDITO=VALUES(ID_PERSONA_EDITO),"
                    . "FECHA_EDITO=VALUES(FECHA_EDITO),"
                    . "ID_PERSONA_ELIMINO=VALUES(ID_PERSONA_ELIMINO),"
                    . "FECHA_ELIMINO=VALUES(FECHA_ELIMINO);";
            echo json_encode(RUN_SQL($mysqli, $sql_phones));
        } else {
            echo json_encode($res);
        }
    }
    $mysqli->close();
} else {
    echo json_encode(array('success' => false, 'message' => "FALTAN PARÁMETROS"));
}
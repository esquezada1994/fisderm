<?php

include '../../dll/config.php';
include '../../dll/funciones.php';
$arrayData = array();
$data = json_decode(file_get_contents('php://input'));
if (isset($data)) {
    if (!$mysqli = getConectionDb())
        return;

    (!isset($data->image)) ? $data->image = '' : '';
    $sql_create = "INSERT INTO $DB_NAME.personas (
            ID_PROFESION, 
            ID_CIUDAD, 
            NOMBRES, 
            APELLIDOS, 
            CEDULA, 
            GENERO, 
            FECHA_NACIMIENTO, 
            DIRECCION, 
            IMAGEN, 
            CORREO, 
            TIPO_SANGRE, 
            DESACTIVADO, 
            ID_PERSONA_CREO
            ) VALUES (
            $data->idOccupation, 
            $data->idCity, 
            '" . preg_replace("[\n|\r|\n\r\t|']", "\\n", $data->firstName) . "', 
            '" . preg_replace("[\n|\r|\n\r\t|']", "\\n", $data->lastName) . "', 
            '$data->ci,', 
            $data->idSex, 
            '$data->fBorn', 
            '$data->address', 
            '$data->image', 
            '$data->email', 
            $data->idTypeBlood, 
            " . (int) $data->disable . ", 
            " . $_SESSION["ID_PERSONA"] . "
    )";
    $res = json_encode(RUN_SQL($mysqli, $sql_create));
    if (isset($phones)) {
        $phones = json_decode($phones);
        if (count($phones) > 0) {
            $nuevos = false;
            $sql_phones = "INSERT INTO $DB_NAME.telefonos  "
                    . "(ID_TELEFONO, ID_PERSONA, NUMERO, ID_TIPO, DESACTIVADO, ID_PERSONA_CREO) "
                    . "VALUES ";
            foreach ($phones as $p) {
                if ((bool) $p->new) {
                    $sql_phones .= "(NULL, '" . $res['id'] . "'"
                            . ", '" . $p->number . "'" . ", " . $p->idType . ""
                            . ", " . (int) $p->disable . "" . ", " . $_SESSION["ID_PERSONA"] . ""
                            . "),";
                }
            }
            $sql_phones = substr($sql_phones, 0, -1);
            echo json_encode(RUN_SQL($mysqli, $sql_phones));
        } else {
            echo json_encode($res);
        }
    }
    $mysqli->close();
} else {
    echo json_encode(array('success' => false, 'message' => "FALTAN PARÁMETROS"));
}
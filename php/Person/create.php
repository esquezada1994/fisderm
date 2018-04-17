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
    echo $sql;
//    echo json_encode(RUN_SQL($mysqli, $sql_create));
    $mysqli->close();
} else {
    echo json_encode(array('success' => false, 'message' => "FALTAN PARÁMETROS"));
}

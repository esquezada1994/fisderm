<?php

include '../../dll/config.php';
include '../../dll/funciones.php';

if (!$mysqli = getConectionDb())
    return;

extract($_GET);

$sql = "SELECT 
            ID_PERSONA as id, 
            CONCAT(NOMBRES,' ',APELLIDOS) as text, 
            CEDULA as ci, 
            FECHA_NACIMIENTO as fBorn, 
            DIRECCION as address, 
            IMAGEN as image, 
            CORREO as email, 
            TIPO_SANGRE as idTypeBlood
        FROM
            $DB_NAME.personas
        WHERE
            DESACTIVADO = 0 ";

if (isset($param)) {
    $sql .= " AND ("
            . "LOWER(NOMBRES) LIKE LOWER('%$param%')"
            . "OR LOWER(APELLIDOS) LIKE LOWER('%$param%')"
            . "OR LOWER(CORREO) LIKE LOWER('%$param%')"
            . "OR CEDULA LIKE '%$param%'"
            . ") ";
}
if (isset($required)) {
    $sql .= " AND ID_PERSONA NOT IN (SELECT ID_PERSONA FROM $DB_NAME.personal_sistema) ";
}
if (isset($limite)) {
    $sql .= " LIMIT $limite";
} else {
    $sql .= " LIMIT $LIMITE_REGISTROS_GET;";
}

$result = $mysqli->query($sql);
if (!isset($result->num_rows)) {
    echo json_encode(array('success' => false, 'error' => "NO EXISTEN RESULTADOS"));
    $mysqli->close();
    return;
}
$data = [];
while ($myrow = $result->fetch_assoc()) {
    $data[] = $myrow;
}
$mysqli->close();
echo json_encode(array('success' => true, 'data' => $data));

<?php

include '../../dll/config.php';
include '../../dll/funciones.php';

if (!$mysqli = getConectionDb())
    return;

extract($_GET);

$sql = "SELECT 
            ID_ROL as id,
            ROL as text,
            DESCRIPCION as description
        FROM
            $DB_NAME.roles
        WHERE
            DESACTIVADO = 0 ";

if (isset($param)) {
    $sql .= "AND ("
            . "LOWER(ROL) LIKE LOWER('%$param%') "
            . "OR LOWER(DESCRIPCION) LIKE LOWER('%$param%') "
            . "OR ID_ROL = '$param'"
            . ") ";
}

if (isset($required)) {
    $sql .= "AND ID_ROL IN ($required) ";
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

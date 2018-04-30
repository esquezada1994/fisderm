<?php

include '../../dll/config.php';
include '../../dll/funciones.php';

if (!$mysqli = getConectionDb())
    return;

extract($_GET);

$sql = "SELECT 
            ID_TIPO_SUELDO as id,
            TIPO_SUELDO as text
        FROM
            $DB_NAME.tipo_sueldo
        WHERE
            DESACTIVADO = 0 ";

if (isset($param)) {
    $sql .= " AND ("
            . "LOWER(TIPO_SUELDO) LIKE LOWER('%$param%') "
            . "OR ID_TIPO_SUELDO = '$param' "
            . ") ";
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

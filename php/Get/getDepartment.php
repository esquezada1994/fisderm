<?php

include '../../dll/config.php';
include '../../dll/funciones.php';

if (!$mysqli = getConectionDb())
    return;

extract($_GET);

$sql = "SELECT 
            ID_DEPARTAMENTO as id,
            DEPARTAMENTO as text,
            DESCRIPCION as description
        FROM
            $DB_NAME.departamento
        WHERE
            DESACTIVADO = 0 ";

if (isset($param)) {
    $sql .= "AND ("
            . "LOWER(DEPARTAMENTO) LIKE LOWER('%$param%') "
            . "OR LOWER(DESCRIPCION) LIKE LOWER('%$param%') "
            . "OR ID_DEPARTAMENTO = '$param'"
            . ") ";
}

if (isset($required)) {
    $sql .= "AND ID_DEPARTAMENTO IN ($required) ";
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

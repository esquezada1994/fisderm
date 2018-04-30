<?php

include '../../dll/config.php';
include '../../dll/funciones.php';

if (!$mysqli = getConectionDb())
    return;

extract($_GET);

$sql = "SELECT 
            ID_HORARIO as id,
            HORARIO as text
        FROM
            $DB_NAME.horario
        WHERE
            TRUE ";

if (isset($param)) {
    $sql .= "AND ("
            . "LOWER(HORARIO) LIKE LOWER('%$param%') "
            . "OR ID_HORARIO = '$param'"
            . ") ";
}

if (isset($required)) {
    $sql .= "AND ID_HORARIO IN ($required) ";
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

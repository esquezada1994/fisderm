<?php

include '../../dll/config.php';
include '../../dll/funciones.php';

if (!$mysqli = getConectionDb())
    return;

extract($_GET);

$sql = "SELECT 
            ID_PROFESION as id,
            CONCAT(PROFESION, ' (', ABREVIATURA, ')') as text,
            PROFESION as occupation,
            ABREVIATURA as abbreviation,
            IF(DESACTIVADO = 0, 0, 1) as disable,
            ID_PERSONA_CREO as idCreate,
            FECHA_CREO as fCreate,
            ID_PERSONA_EDITO as idUpdate,
            FECHA_EDITO as fUpdate,
            ID_PERSONA_ELIMINO as idDelete,
            FECHA_ELIMINO as fDelete
        FROM
            $DB_NAME.profesion
        WHERE
            TRUE ";

if (isset($param)) {
    $sql .= "AND (LOWER(PROFESION) LIKE LOWER('%$param%') "
            . "OR LOWER(ABREVIATURA) LIKE LOWER('%$param%') "
            . "OR ID_PROFESION = '$param') ";
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

<?php

include '../../dll/config.php';
include '../../dll/funciones.php';

if (!$mysqli = getConectionDb())
    return;

extract($_GET);

$sql = "SELECT 
            p.ID_PERSONA AS id,
            CONCAT(p.NOMBRES, ' ', p.APELLIDOS) AS text,
            p.CEDULA AS ci,
            p.FECHA_NACIMIENTO AS fBorn,
            p.DIRECCION AS address,
            p.IMAGEN AS image,
            p.CORREO AS email,
            p.TIPO_SANGRE AS idTypeBlood
        FROM
            $DB_NAME.personas p
                INNER JOIN
            $DB_NAME.personal_sistema ps ON ps.ID_PERSONA = p.ID_PERSONA
                INNER JOIN
            $DB_NAME.roles_personal rp ON rp.ID_PERSONAL_SISTEMA = ps.ID_PERSONAL_SISTEMA
                AND rp.ID_ROL IN (2 , 3)
        WHERE
            p.DESACTIVADO = 0 ";

if (isset($param)) {
    $sql .= " AND ("
            . "LOWER(p.NOMBRES) LIKE LOWER('%$param%')"
            . "OR LOWER(p.APELLIDOS) LIKE LOWER('%$param%')"
            . "OR LOWER(p.CORREO) LIKE LOWER('%$param%')"
            . "OR p.CEDULA LIKE '%$param%'"
            . ") ";
}
if (isset($required)) {
    $sql .= " AND p.ID_PERSONA NOT IN ($required) ";
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
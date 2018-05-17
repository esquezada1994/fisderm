<?php

include '../../dll/config.php';
include '../../dll/funciones.php';
extract($_GET);
if (!isset($param)) {
    $param = '';
}
if (!$mysqli = getConectionDb())
    return;
$sql = "SELECT 
            c.ID_CITA AS id,
            c.ID_PERSONAL_SISTEMA AS idStaff,
            c.ID_PERSONA AS idPerson,
            CONCAT(p.NOMBRES, ' ', p.APELLIDOS) AS title,
            c.ID_TIPO_CITA AS idTypeAppointment,
            c.FECHA_CITA AS dateAppointment,
            c.FECHA_CITA AS start,
            ADDTIME(c.FECHA_CITA, c.TIEMPO_CITA) AS end,
            c.TIEMPO_CITA AS timeDuration,
            c.COSTO AS cost,
            c.DESCUENTO AS discount,
            IF(c.PERMITIR_DESCUENTO = 0, 0, 1) AS enableDiscount,
            c.DESCRIPCION AS description,
            c.ESTADO AS state,
            IF(c.DESACTIVADO = 0, 0, 1) AS disable,
            c.ID_PERSONA_CREO AS idCreate,
            c.FECHA_CREO AS fCreate,
            c.ID_PERSONA_EDITO AS idUpdate,
            c.FECHA_EDITO AS fUpdate,
            c.ID_PERSONA_ELIMINO AS idDelete,
            c.FECHA_ELIMINO AS fDelete
        FROM
            $DB_NAME.citas c
                INNER JOIN
            $DB_NAME.personas p ON c.ID_PERSONA = p.ID_PERSONA
        
        WHERE 
            TRUE";

if (isset($medic)) {
    if ($medic !== '') {
        $sql .= " AND ID_PERSONAL_SISTEMA = $medic ";
    }
}
if (isset($person)) {
    if ($person !== '') {
        $sql .= " AND ID_PERSONA = $person ";
    }
}
if (isset($state)) {
    if ($state !== '') {
        $sql .= " AND ESTADO = $state ";
    }
}
if (isset($date)) {
    if ($date !== '') {
        $sql .= " AND FECHA_CITA = '$date' ";
    }
}

if (isset($limite)) {
    $sql .= " LIMIT $limite";
} else {
    $sql .= " LIMIT $LIMITE_REGISTROS";
}

$result = $mysqli->query($sql);
if (!isset($result->num_rows)) {
    echo json_encode(array('success' => false, 'error' => "NO EXISTEN RESULTADOS"));
    return $mysqli->close();
}
$data = [];
while ($myrow = $result->fetch_assoc()) {
    $data[] = $myrow;
}
$mysqli->close();
echo json_encode(array('success' => true, 'data' => $data, 'total' => count($data)));

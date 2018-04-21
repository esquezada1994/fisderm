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
            p.ID_PERSONA AS id,
            p.ID_PROFESION AS idOccupation,
            pf.PROFESION AS ocuppation,
            p.ID_CIUDAD AS idCity,
            p.NOMBRES AS firstName,
            p.APELLIDOS AS lastName,
            c.CIUDAD AS city,
            CONCAT(p.NOMBRES, ' ', p.APELLIDOS) AS names,
            p.CEDULA AS ci,
            p.GENERO AS idSex,
            p.FECHA_NACIMIENTO AS fBorn,
            p.DIRECCION AS address,
            p.IMAGEN AS image,
            p.CORREO AS email,
            p.TIPO_SANGRE AS idTypeBlood,
            (SELECT 
                    GROUP_CONCAT(NUMERO, ''
                            SEPARATOR ', ')
                FROM
                    fisderm.telefonos
                WHERE
                    TRUE AND id_persona = 1) AS phones,
            IF(p.DESACTIVADO = 0, 0, 1) as disable,
            p.ID_PERSONA_CREO AS idCreate,
            p.FECHA_CREO AS fCreate,
            p.ID_PERSONA_EDITO AS idUpdate,
            p.FECHA_EDITO AS fUpdate,
            p.ID_PERSONA_ELIMINO AS idDelete,
            p.FECHA_ELIMINO AS fDelete
        FROM
            $DB_NAME.personas p
                INNER JOIN
            $DB_NAME.profesion pf ON pf.ID_PROFESION = p.ID_PROFESION
                INNER JOIN
            $DB_NAME.ciudad c ON c.ID_CIUDAD = p.ID_CIUDAD ";

if (isset($paises)) {
    if ($paises !== '') {
        $sql .= "AND c.idPais IN ($paises) ";
    }
}

$sql .= " ORDER BY p.ID_PERSONA DESC ";

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

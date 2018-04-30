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
            ps.ID_PERSONAL_SISTEMA AS id,
            ps.ID_PERSONA AS idPerson,
            CONCAT(P.NOMBRES, ' ', P.APELLIDOS) AS names,
            ps.ID_DEPARTAMENTO AS idDepartment,
            d.DEPARTAMENTO AS department,
            ps.ID_TIPO_SUELDO AS idTypeSalary,
            ts.TIPO_SUELDO AS typeSalary,
            ps.USUARIO AS user,
            ps.CONTRASENIA AS pass,
            ps.SUELDO AS salary,
            GROUP_CONCAT(DISTINCT rp.ID_ROL) AS idRoles,
            GROUP_CONCAT(DISTINCT r.ROL
                SEPARATOR ', ') AS roles,
            GROUP_CONCAT(DISTINCT hp.ID_HORARIO) AS idSchedules,
            ps.DESACTIVADO AS disable,
            p.ID_PERSONA_CREO AS idCreate,
            ps.FECHA_CREO AS fCreate,
            ps.ID_PERSONA_EDITO AS idUpdate,
            ps.FECHA_EDITO AS fUpdate,
            ps.ID_PERSONA_ELIMINO AS idDelete,
            ps.FECHA_ELIMINO AS fDelete
        FROM
            fisderm.personal_sistema ps
                INNER JOIN
            personas p ON p.ID_PERSONA = ps.ID_PERSONA
                INNER JOIN
            departamento d ON d.ID_DEPARTAMENTO = ps.ID_DEPARTAMENTO
                INNER JOIN
            tipo_sueldo ts ON ts.ID_TIPO_SUELDO = ps.ID_TIPO_SUELDO
                LEFT JOIN
            roles_personal rp ON rp.ID_PERSONAL_SISTEMA = ps.ID_PERSONAL_SISTEMA AND rp.DESACTIVADO = 0
                LEFT JOIN
            roles r ON r.ID_ROL = rp.ID_ROL
                LEFT JOIN
            horario_personal hp ON hp.ID_PERSONAL_SISTEMA = ps.ID_PERSONAL_SISTEMA AND hp.DESACTIVADO = 0
        WHERE
            TRUE ";

if (isset($filter)) {
    if ($filter !== '') {
        $sql .= " AND ("
                . " LOWER(p.NOMBRES) LIKE LOWER('%$filter%') "
                . " OR LOWER(p.APELLIDOS) LIKE LOWER('%$filter%') "
                . " OR p.CEDULA LIKE '%$filter%' "
                . " OR LOWER(p.CORREO) LIKE LOWER('%$filter%') "
                . " OR LOWER(ps.USUARIO) LIKE LOWER('%$filter%') "
                . ")";
    }
}

if (isset($roles)) {
    if ($roles !== '') {
        $sql .= " AND rp.ID_ROL IN ($roles) ";
    }
}

$sql .= " GROUP BY id";
$sql .= " ORDER BY ps.ID_PERSONAL_SISTEMA DESC ";

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
    if ($myrow['id'] !== null) {
        $data[] = $myrow;
    }
}
$mysqli->close();
echo json_encode(array('success' => true, 'data' => $data, 'total' => count($data)));

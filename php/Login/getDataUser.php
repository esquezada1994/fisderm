<?php

include '../../dll/config.php';
include '../../dll/funciones.php';
if (!$mysqli = getConectionDb())
    return errorLogin($MSJ_ERROR_CONEXION);

$sql_permisos = "SELECT 
                    m.id_modulo,
                    m.nombre,
                    m.vista,
                    m.icono,
                    p.orden,
                    IF(p.leer = 0, 0, 1) AS leer,
                    IF(p.crear = 0, 0, 1) AS crear,
                    IF(p.editar = 0, 0, 1) AS editar,
                    IF(p.eliminar = 0, 0, 1) AS eliminar
                FROM
                    $DB_NAME.permisos p
                        INNER JOIN
                    $DB_NAME.modulo m ON m.id_modulo = p.id_modulo
                        INNER JOIN
                    $DB_NAME.roles_personal rp ON rp.id_rol = p.id_rol
                WHERE
                    m.desactivado = 0 AND rp.desactivado = 0
                        AND rp.id_personal_sistema = " . $_SESSION["ID_PERSONAL_SISTEMA"] . "
                ORDER BY p.orden ASC;";

$result_permisos = $mysqli->query($sql_permisos);
if ($result_permisos->num_rows > 0) {
    while ($data = $result_permisos->fetch_assoc()) {
        $permisos = array('read' => intval($data['leer']), 'create' => intval($data['crear']), 'update' => intval($data['editar']), 'delete' => intval($data['eliminar']));
        $modulos[] = array(
            'id' => intval($data['id_modulo']),
            'iconCls' => $data['icono'],
            'viewType' => $data['vista'],
            'parentId' => 'root',
            'index' => 0,
            'orden' => intval($data['orden']),
            'text' => $data['nombre'],
            'name' => $data['nombre'],
            'PATH' => 'admin.php',
            'leaf' => true,
            'rowCls' => 'nav-tree-badge',
            'permisos' => $permisos);
    }
    echo json_encode(array('success' => true, 'data' => $modulos));
} else {
    echo json_encode(array('success' => false, 'message' => "SU USUARIO NO TIENE ASIGNADO MÓDULOS POR FAVOR LLAMAR A SOPORTE TÉCNICO PARA QUE SOLVENTE EL PROBLEMA"));
}
$mysqli->close();

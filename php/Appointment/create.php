<?php

include '../../dll/config.php';
include '../../dll/funciones.php';
$arrayData = array();
$data = json_decode(file_get_contents('php://input'));
if (isset($data)) {
    if (!$mysqli = getConectionDb())
        return;

    $dateAppointment = $data->dateAppointment . ' ' . $data->timeAppointment;
    $sql_verify = "SELECT 
                    COUNT(ID_CITA) AS citas
                FROM
                    $DB_NAME.citas
                WHERE
                    ID_PERSONAL_SISTEMA = 4 AND ESTADO <> 3
                        AND (((UNIX_TIMESTAMP('$dateAppointment') + 1) BETWEEN UNIX_TIMESTAMP(FECHA_CITA) AND UNIX_TIMESTAMP(ADDTIME(FECHA_CITA, TIEMPO_CITA)))
                        OR ((UNIX_TIMESTAMP(ADDTIME('$dateAppointment', '$data->timeDuration')) - 1) BETWEEN UNIX_TIMESTAMP(FECHA_CITA) AND UNIX_TIMESTAMP(ADDTIME(FECHA_CITA, TIEMPO_CITA)))
                        OR (UNIX_TIMESTAMP(FECHA_CITA) BETWEEN (UNIX_TIMESTAMP('$dateAppointment') + 1) AND (UNIX_TIMESTAMP(ADDTIME('$dateAppointment', '$data->timeDuration'))) - 1)
                        OR (UNIX_TIMESTAMP(ADDTIME(FECHA_CITA, TIEMPO_CITA)) BETWEEN (UNIX_TIMESTAMP('$dateAppointment') + 1) AND (UNIX_TIMESTAMP(ADDTIME('$dateAppointment', '$data->timeDuration'))) - 1))
                ";
    $result = $mysqli->query($sql_verify);
    if (!isset($result->num_rows)) {
        echo json_encode(array('success' => false, 'error' => "HA OCURRIDO ALGO, POR FAVOR INTENTELO MAS TARDE."));
        return $mysqli->close();
    }
    $myrow = $result->fetch_assoc();
    if (intval($myrow['citas'] === 0)) {
        $sql_create = "INSERT INTO $DB_NAME.citas (
            ID_PERSONAL_SISTEMA,
            ID_PERSONA,
            ID_TIPO_CITA,
            FECHA_CITA,
            TIEMPO_CITA,
            COSTO,
            DESCUENTO,
            PERMITIR_DESCUENTO,
            DESCRIPCION,
            ESTADO,
            DESACTIVADO,
            ID_PERSONA_CREO
            ) VALUES (
            $data->idStaff, 
            $data->idPerson, 
            $data->idTypeAppointment, 
            '$dateAppointment', 
            '$data->timeDuration', 
            $data->cost, 
            $data->discount, 
            $data->enableDiscount,
            '" . preg_replace("[\n|\r|\n\r\t|']", "\\n", $data->description) . "', 
            1,
            " . (int) $data->disable . ", 
            " . $_SESSION["ID_PERSONA"] . "
        )";
        echo json_encode(RUN_SQL($mysqli, $sql_create));
    } else {
        echo json_encode(array('success' => false, 'message' => "YA EXISTE UNA CITA EN ESTA FECHA Y HORA."));
    }
    $mysqli->close();
} else {
    echo json_encode(array('success' => false, 'message' => "FALTAN PARÁMETROS."));
}
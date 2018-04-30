<?php
$VERSION = "0.0.3";
$URL_IMG = "img/";
$AMBIENTE = 0; 
$LIMITE_REGISTROS = 50;
$LIMITE_REGISTROS_GET = 10;
//VARIABLES DE LOGIN

$BANNER = $URL_IMG . "login/banner_login.png";
$APP_ICONO = $URL_IMG . "sistema/sistema_logo.png";
$NOMBRE_APP = "FIS&DERM";
$DB_NAME = 'fisderm';

// VARIABLES DE ERROR
$MSJ_NO_EXIST_RESULT = "NO EXISTEN RESULTADOS";
$MSJ_ERROR_CONEXION = "PROBLEMAS DE CONEXIÓN CON EL SERVIDOR";
session_start();
if (isset($_SESSION["AMBIENTE"])) {
    $_SESSION["AMBIENTE"] = $AMBIENTE;
} else {
    $_SESSION["AMBIENTE"] = $AMBIENTE;
    $_SESSION["LOGGED"] = 0;
    $_SESSION["URL_SISTEMA"] = "";
}

function getConectionDb() {
    $db_name = "fisderm";
    if ($_SESSION["AMBIENTE"] === 0) {
        $db_host = "127.0.0.1";
        $db_user = "root";
        $db_password = "";
        return conectBase($db_host, $db_user, $db_password, $db_name, 3306);
    } else if ($_SESSION["AMBIENTE"] === 1) {
        $db_host = "";
        $db_user = "";
        $db_password = "";
        return conectBase($db_host, $db_user, $db_password, $db_name, 3306);
    } else {
        echo json_encode(array('success' => false, 'message' => 'NO ESTÁ CONFIGURADO CORRECTAMENTE.', 'url' => '../../index.php'));
        return;
    }
}

function conectBase($db_host, $db_user, $db_password, $db_name, $puerto) {
    $mysqli = new mysqli($db_host, $db_user, $db_password, $db_name, $puerto);
    $mysqli->set_charset("utf8mb4");
    if ($mysqli->connect_errno) {
        echo json_encode(array('success' => false, 'message' => "ERROR DE CONEXION"));
        return false;
    }
    return $mysqli;
}

<?php

function RUN_SQL($mysqli, $sql) {
    $stmt = $mysqli->prepare($sql);
    if (!$stmt) {
        return array('success' => false, 'message' => "ERROR EN EL SQL DE CREATE");
    }
    $stmt->execute();
    if ($stmt->affected_rows > 0) {
        return array('success' => true, 'message' => "DATOS CORRECTAMENTE", "id" => $stmt->insert_id);
    } elseif ($stmt->affected_rows == 0) {
        return array('success' => false, 'message' => "NO SE INSERTO: $sql", "error" => "NO SE HAN DETECTADO CAMBIOS");
    } else {
        return array('success' => false, 'message' => "NO SE INSERTO: $sql", "error" => "ERROR: " . $stmt->error);
    }
}

function EJECUTAR_SELECT($mysqli, $sql) {
    $result = $mysqli->query($sql);
    if (!isset($result->num_rows)) {
        return $data->success = false;
    }
    return $result;
}

function getEncryption($text) {
    $salt = "KR@D@C";
    return md5(md5(md5($text) . md5($salt)));
}

function errorLogin($text) {
    echo "<script>alert('$text');</script>";
    echo "<script>location.href='../../index.php'</script>";
}

function GetUserIP() {
    if (isset($_SERVER)) {
        if (isset($_SERVER["HTTP_X_FORWARDED_FOR"])) {
            return $_SERVER["HTTP_X_FORWARDED_FOR"];
        }
        if (isset($_SERVER["HTTP_CLIENT_IP"])) {
            return $_SERVER["HTTP_CLIENT_IP"];
        }
        return $_SERVER["REMOTE_ADDR"];
    }
    if (getenv('HTTP_X_FORWARDED_FOR')) {
        return getenv('HTTP_X_FORWARDED_FOR');
    }
    if (getenv('HTTP_CLIENT_IP')) {
        return getenv('HTTP_CLIENT_IP');
    }
    return getenv('REMOTE_ADDR');
}

function GetUserHost() {
    if (isset($_SERVER)) {
        if (isset($_SERVER["HTTP_X_FORWARDED_FOR"])) {
            return gethostbyaddr($_SERVER["HTTP_X_FORWARDED_FOR"]);
        }
        if (isset($_SERVER["HTTP_CLIENT_IP"])) {
            return gethostbyaddr($_SERVER["HTTP_CLIENT_IP"]);
        }
        return gethostbyaddr($_SERVER["REMOTE_ADDR"]);
    }
    if (getenv('HTTP_X_FORWARDED_FOR')) {
        return gethostbyaddr(getenv('HTTP_X_FORWARDED_FOR'));
    }
    if (getenv('HTTP_CLIENT_IP')) {
        return gethostbyaddr(getenv('HTTP_CLIENT_IP'));
    }
    return gethostbyaddr(getenv('REMOTE_ADDR'));
}

function crearScript() {
    echo '<script>'
    . "var ID_ADMINISTRADOR = " . $_SESSION["ID_ADMINISTRADOR"] . "; var USUARIO = '" . $_SESSION["USUARIO"] . "';"
    . "var NOMBRES = '" . $_SESSION["NOMBRES"] . "'; var APELLIDOS = '" . $_SESSION["APELLIDOS"] . "';"
    . "var CELULAR = '" . $_SESSION["CELULAR"] . "'; var CEDULA = '" . $_SESSION["CEDULA"] . "';"
    . "var CORREO = '" . $_SESSION["CORREO"] . "'; var PERSONA = '" . $_SESSION["PERSONA"] . "';"
    . "var IMAGEN = '" . $_SESSION["IMAGEN"] . "'; var BLOQUEADO = " . $_SESSION["BLOQUEADO"] . ";"
    . "var URL_SISTEMA = '" . $_SESSION["URL_SISTEMA"] . "'; "
    . "</script>";
}

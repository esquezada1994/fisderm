<?php

function RUN_SQL($mysqli, $sql) {
    $stmt = $mysqli->prepare($sql);
    if (!$stmt) {
        return array('success' => false, 'text' => "ERROR EN LA CONSULTA");
    }
    $stmt->execute();
    if ($stmt->affected_rows > 0) {
        return array('success' => true, 'text' => "DATOS GUARDADOS", "id" => $stmt->insert_id);
    } elseif ($stmt->affected_rows == 0) {
        return array('success' => false, "text" => "NO SE HAN DETECTADO CAMBIOS");
    } else {
        return array('success' => false, "text" => "ERROR: " . $stmt->error);
    }
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

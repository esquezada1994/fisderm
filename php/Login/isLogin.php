<?php
session_start();
// Comprobar si esta logueado
if (!isset($_SESSION["IS_SESSION"])) {
    header("Location: index.php");
}
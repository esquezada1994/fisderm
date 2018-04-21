<?php
include("./dll/config.php");
if (isset($_SESSION["IS_LOGGED"]) && $_SESSION["IS_LOGGED"] === 0)
    header("Location: php/Login/logout.php");
?>
<!DOCTYPE HTML>
<html manifest="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
        <title><?php echo $NOMBRE_APP . ' ' . $VERSION ?></title>
        <link rel="shortcut icon" href="<?php echo $APP_ICONO; ?>" type="image/x-icon" />
        <!--CSS Alertify-->
        <link href="vendor/alertify/css/themes/default.rtl.css?<?php echo $VERSION ?>" rel="stylesheet" type="text/css"/>
        <link href="css/Admin-all.css?<?php echo $VERSION ?>" rel="stylesheet" type="text/css"/>
        <!--CSS Bootstrap-->
        <link href="css/main.css?<?php echo $VERSION ?>" rel="stylesheet" type="text/css"/>
        <!--CSS Theme EXT JS LOCAL -->
        <!--<link href="ext/classic/theme-gray/resources/theme-gray-all.css" rel="stylesheet" type="text/css"/>-->
        <link href="ext/classic/theme-triton/resources/theme-triton-all.css" rel="stylesheet" type="text/css"/>
        <!--CSS Theme EXT JS REMOTE-->
        <!--<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/classic/theme-gray/resources/theme-gray-all.css"/>-->
        <!--CSS Font Awesome LOCAL-->
        <link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
        <!--CSS Font Awesome REMOTE-->
        <!--<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/packages/font-awesome/resources/font-awesome-all.css"/>-->
        <!--CSS Charts-->
        <link href="ext/packages/charts/classic/classic/resources/charts-all.css" rel="stylesheet" type="text/css"/>
        <link href="vendor/pace-1.0.2/pace-theme-flash.tmpl.css" rel="stylesheet" type="text/css"/>

        <!--JS Jquery-->
        <script src="vendor/jquery/jquery.min.js?<?php echo $VERSION ?>" type="text/javascript"></script>
        <!--JS Alertify-->
        <!-- JS APP-->
        <script src="dll/config.js?<?php echo $VERSION ?>" type="text/javascript"></script>
        <script src="js/funciones.js?<?php echo $VERSION ?>" type="text/javascript"></script>
        <script src="js/run.js?<?php echo $VERSION ?>" type="text/javascript"></script>
        <script src="vendor/md5.min.js" type="text/javascript"></script>
        <script src="vendor/hex_md5.js" type="text/javascript"></script>
        <!-- JS EXT LOCAL-->
        <script src="ext/ext-all.js" type="text/javascript"></script>
        <script src="ext/packages/charts/classic/charts.js" type="text/javascript"></script>
        <script src="ext/classic/theme-triton/theme-triton.js" type="text/javascript"></script>
        <!--<script src="ext/classic/theme-gray/theme-gray.js" type="text/javascript"></script>-->
        <script src="ext/packages/ux/classic/ux.js" type="text/javascript"></script>
        <!-- JS EXT REMOTO-->
        <!--<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/ext-all.js"></script>-->
        <!--<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/classic/theme-gray/theme-gray.js"></script>-->
        <!--<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/packages/charts/classic/charts.js"></script>-->
        <!-- JS APP-->
        <script src="app.js?<?php echo $VERSION ?>" type="text/javascript"></script>
        <!-- JS MOMENT-->
        <script src="vendor/moment.js?<?php echo $VERSION ?>" type="text/javascript"></script>
        <!-- JS SOCKET -->
        <script src="vendor/socket.io.js?<?php echo $VERSION ?>" type="text/javascript"></script>
        <!--JS MAP -->
        <!--<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.0/mapbox-gl.js'></script>-->
        <script src="vendor/pace-1.0.2/pace.min.js" type="text/javascript"></script>
    </head>
    <body>
    <center>
<!--        <img alt="karview" src="img/loaderModal.gif"/>-->
        <br>
        <img alt="Sistema FisDerm" src="<?php echo $URL_IMG; ?>/sistema/logo.png" style=""/>
    </center>
</body>
</html>

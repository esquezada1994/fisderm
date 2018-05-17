<?php
include './dll/config.php';
if (isset($_SESSION["LOGGED"]) && $_SESSION["LOGGED"] == 1)
    header("Location: ./" . $_SESSION["URL_SISTEMA"]);
?>
<!DOCTYPE html>
<html>
    <head>
        <title><?php echo $NOMBRE_APP; ?></title>
        <link rel="shortcut icon" href="<?php echo $APP_ICONO; ?>" type="image/x-icon" />
        <meta content='text/html; charset=UTF-8' http-equiv='Content-Type' />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title><?php echo $APP_NOMBRE . ' ' . $VERSION ?></title>
        <link href="css/main.css?<?php echo $VERSION ?>" rel="stylesheet" type="text/css"/>
        <!--CSS Bootstrap-->
        <link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
        <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <!--CSS Alertify-->
        <link href="vendor/alertify/css/alertify.rtl.css?<?php echo $VERSION ?>" rel="stylesheet" type="text/css"/>
        <link href="vendor/alertify/css/themes/default.rtl.css?<?php echo $VERSION ?>" rel="stylesheet" type="text/css"/>
        <!--JS Jquery-->
        <script src="vendor/jquery/jquery.min.js" type="text/javascript"></script>
        <!-- JS bootstrap-->
        <script src="vendor/popper/popper.min.js" type="text/javascript"></script>
        <script src="vendor/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
        <!--JS Alertify-->
        <script src="vendor/alertify/alertify.js?<?php echo $VERSION ?>" type="text/javascript"></script>
        <!--JS MD5-->
        <script src="vendor/md5.min.js" type="text/javascript"></script>
        <script src="vendor/hex_md5.js" type="text/javascript"></script>
        <script src="js/funciones.js?<?php echo $VERSION ?>" type="text/javascript"></script><!--FUNCIONES-->
        <script src="js/login/login.js?<?php echo $VERSION ?>" type="text/javascript"></script><!--LOGIN-->
        <script src="dll/config.js" type="text/javascript"></script><!--LOGIN-->
    </head>
    <body style="background-image: url('<?php echo $URL_IMG; ?>/sistema/logo.png');background-repeat:no-repeat;background-position: top center;">
        <div class="container">
            <div class="form-horizontal" id="frm-login">
                <div class="row" style="margin-top:20%">
                    <div class="col-md-3"></div>
                    <div class="col-md-6">
                        <div class="form-group" id="group-usuario">
                            <label class="sr-only" for="email">Usuario</label>
                            <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-at"></i></div>
                                <input type="text" name="user" id="usuario" class="form-control formLogin" placeholder="Usuario" required autofocus/>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3" id="msj-usu-error">
                        <div class="form-control-feedback">
                            <span class="text-danger align-middle">
                                <div id="cargando"></div>
                                <div id="msj-validar"></div>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3"></div>
                    <div class="col-md-6">
                        <div class="form-group" id="group-contrasenia">
                            <label class="sr-only" for="pass">Contraseña</label>
                            <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-key"></i></div>
                                <input type="password" name="contrasenia" id="contrasenia" class="form-control formLogin" placeholder="Contraseña" required/>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3" id="msj-con-error">
                        <div class="form-control-feedback">
                            <span class="text-danger align-middle">
                                <div id="cargandoCon"></div>
                                <div id="msj-con-validar"></div>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3"></div>
                    <div class="col-md-6" style="padding-top: .35rem">
                        <div class="form-check mb-2 mr-sm-2 mb-sm-0">
                            <label class="form-check-label">
                                <input class="form-check-input" name="remember" type="checkbox"  onclick="mostrarClave(this.checked, 'contrasenia')"/>
                                <span style="padding-bottom: .15rem">Mostrar contraseña</span>
                            </label>
                        </div>
                    </div>
                </div>
                <input name = "latitud" type="text" id="latitud" style="display: none;">
                <input name = "longitud" type="text" id="longitud" style="display: none;">
                <center>
                    <button type="submit" id="bnt-login" name="bnt-login" class="btn btn-success"><i class="fa fa-sign-in"></i> Ingresar</button>
                </center>
                <br/>
                <center>
                    <a class="btn btn-link" href="#" data-toggle="modal" data-target="#restContraModal">¿Olvidó su contraseña?</a>
                </center>
                <div class="row" >
                    <div class="col-md-4"></div>
                    <div class="col-md-4"></div>
                </div>
            </div>
        </div>
    </body>
</html>
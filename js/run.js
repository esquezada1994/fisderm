
function run(callback) {
    $.ajax({
        type: "POST",
        url: 'php/Login/getDataUser.php',
        success: function (response) {
            var data = JSON.parse(response);
            if (data.success === false) {
                borrarCookies();
                alert(data.message);
                window.location = 'php/Login/logout.php';
                return callback(-1);
            } else {
                MODULOS = data.data;
//                if (USUARIO.BLOQUEADO === 1) {
//                    borrarCookies();
//                    window.location = 'php/Login/logout.php';
//                    return callback(-1);
//                }
//                showMessage(data.message, 1);
//                inicializarEntorno();
                return callback(1);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            showMessage(MENSAJE_ERROR, 2);
        }
    });
}
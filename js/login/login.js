$(document).ready(function () {
    $('input[type=password]').keyup(function (e) {
        if (e.keyCode === 13) {
            login();
        }
    });
    $('#bnt-login').click(function () {
        login();
    });
});
function mostrarClave(isSelect, id) {
    if (isSelect) {
        document.getElementById(id).type = "text";
    } else {
        document.getElementById(id).type = "password";
    }
}
function login() {
//    $('#cargandoModal').modal('show');
    $.ajax({
        type: "POST",
        url: 'php/Login/login.php',
        data: {user: $('#usuario').val(), pass: hex_md5($('#contrasenia').val()), latitud: $('#latitud').val(), longitud: $('#longitud').val()},
        success: function (response) {
            var data = JSON.parse(response);
            if (data.success === true) {
//                showMessage(data.message, 1);
//                createCookie("PERSONA", data.persona, 1);
                location.href = 'admin.php';
            } else {
//                showMessage(data.message, 2);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
//            showMessage('ERROR EN LA AUTENTICACIÓN', 2);
        }
    });
}
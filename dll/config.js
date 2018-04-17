//VARIABLES DEL SISTEMA
var AMBIENTE = 0;////SI ES: 0 DESARROLLO Y 1 PRODUCCION 
var APP = "FIS&DERM";
var TITULO_LOGIN = "";
var TITULO_MAIN_APP = "";
var lang = "es";
TITULO_LOGIN = "Bienvenido a " + APP;
//MAIN
var MODULOS = [];
var WIDTH_NAVEGACION = 200;
var HEIGT_VIEWS = 0;
var WIDTH_VIEWS = 0;
if (document.body) {
    WIDTH_VIEWS = (document.body.clientWidth);
    HEIGT_VIEWS = (document.body.clientHeight);
} else {
    WIDTH_VIEWS = (window.innerWidth);
    HEIGT_VIEWS = (window.innerHeight);
}
HEIGT_VIEWS = HEIGT_VIEWS - 65;
var URL_IMG_SISTEMA = 'img/sistema/';
var URL_IMG_PERSONAS = 'img/personas/';
var URL_IMG_EVOLUCIONES = 'img/evoluciones/';
//CARGAR LENGUAJE
var rawFile = new XMLHttpRequest();
rawFile.open("GET", "dll/lang/" + lang + ".json", true);
var APP_TEXT;
rawFile.onreadystatechange = function ()
{
    if (rawFile.readyState === 4)
    {
        if (rawFile.status === 200 || rawFile.status == 0)
        {
            var allText = rawFile.responseText;
            APP_TEXT = JSON.parse(allText);
        }
    }
}
rawFile.send(null);
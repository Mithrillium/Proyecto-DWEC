window.onload = iniciar;

function iniciar() {
    //Variables globales a la funcion iniciar
    var encontrado = false;
    var nombre = "";

    function compruebaNombre() {
        //Busqueda secuencial del nombre en localStorage
        var i = 0;
        while (i < localStorage.length && this.value != localStorage.key(i)) {
            i++;
        }
        if (i == localStorage.length) { //si no ha encontrado el nombre
            document.getElementById("confirmacion").innerHTML = "No se encuentra el usuario.";
            encontrado = false;
        } else {
            document.getElementById("confirmacion").innerHTML = "";
            nombre = localStorage.key(i); //Aqui guardo el nombre, que es la key del localStorage
            encontrado = true;
        }
    }
    document.getElementById("nombre").addEventListener('blur', compruebaNombre, false);

    function compruebaLogin() {
        if (encontrado) {
            objetoNombre = JSON.parse(localStorage.getItem(nombre));
            if (document.getElementById("pass").value != objetoNombre.pass) {
                document.getElementById("confirmacion").innerHTML = "La contraseña no es correcta";
            } else {
                document.getElementById("confirmacion").innerHTML = "";
                if (objetoNombre.haCompletadoFormulario) {
                    objetoNombre.haEntrado = true;
                    localStorage.setItem(nombre, JSON.stringify(objetoNombre)); //sobreescribe el mismo item, cambiando solo el haEncontrado
                    //va a página de calcular cambios
                    window.open("cambiaRuedas.html", "_self");
                } else {
                    objetoNombre.haEntrado = true;
                    localStorage.setItem(nombre, JSON.stringify(objetoNombre));
                    //va a página formulario de cómo patina
                    window.open("formularioPrincipal.html", "_self");
                }
            }
        }
    }
    document.getElementById("enviar").addEventListener('click', compruebaLogin, false);
}
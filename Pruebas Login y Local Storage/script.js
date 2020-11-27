//Joaquín Serrano
window.onload = iniciar;

function iniciar() {
    /*******************************
     ******   EJERCICIO 2    ******
     *******************************/
    function mayus() {
        this.value = this.value.toUpperCase();
    }
    document.getElementById("nombre").addEventListener('blur', mayus, false);
    document.getElementById("apellidos").addEventListener('blur', mayus, false);
    /*******************************
     ******   EJERCICIO 3    ******
     *******************************/
    function vacio() {
        if (this.value.length == 0) {
            document.getElementById("errores").innerHTML = "ERROR: " + this.id.toUpperCase() + " no puede estar vacío";
            document.getElementById(this.id).focus();
        } else {
            document.getElementById("errores").innerHTML = "";
        }
    }
    document.getElementById("nombre").addEventListener('blur', vacio, false);
    document.getElementById("apellidos").addEventListener('blur', vacio, false);
    /*******************************
     ******   EJERCICIO 4    ******
     *******************************/
    /*
        IMPORTANTE:
        Las funciones que comprueban EXPRESIONES REGULARES (ejercicios del 4 al 10, el 7 no), 
        lo haría pasando por parámetro la propia expresión regular para 
        ahorrar código (con una funcion bastaría).
        Lo pongo asi para que cada ejercicio esté completo en su apartado.
    */

    function edad() {
        var expresionReg = new RegExp("^[1-9][0-9]?$|^100$|^101$|^102$|^103$|^104$|^105$");
        if (expresionReg.test(this.value)) {
            document.getElementById("errores").innerHTML = "";
        } else {
            document.getElementById("errores").innerHTML = "ERROR: " + this.id.toUpperCase() + " no es correcta.";
            document.getElementById(this.id).focus();
        }
    }

    document.getElementById("edad").addEventListener('blur', edad, false);
    /*******************************
     ******   EJERCICIO 5    ******
     *******************************/
    /*
    EXPRESIÓN REGULAR: ^[0-9]{8}[A-Z]$
        ^ principio de cadena
        [0-9] dígitos del 0 al 9 {8} esas veces exacatemente
        [A-Z] de la a la z en mayúscula, como no se indica nada 1 sola vez
        $ deja la posicion al final de la linea
    */
    function dni() {
        var expresionReg = new RegExp("^[0-9]{8}[A-Z]$");
        if (expresionReg.test(this.value)) {
            document.getElementById("errores").innerHTML = "";
        } else {
            document.getElementById("errores").innerHTML = "ERROR: " + this.id.toUpperCase() + " no es correcto.";
            document.getElementById(this.id).focus();
        }
    }
    document.getElementById("nif").addEventListener('blur', dni, false);
    /*******************************
     ******   EJERCICIO 6    ******
     *******************************/
    /*
    Esta expresión regular está explicada en las diapositivas, no creo que quieras
    que lo copie y ponga aquí una parrafada.
    */
    function correo() {
        var expresionReg = new RegExp("^\\w+([\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$");
        if (expresionReg.test(this.value)) {
            document.getElementById("errores").innerHTML = "";
        } else {
            document.getElementById("errores").innerHTML = "ERROR: " + this.id.toUpperCase() + " no es correcto.";
            document.getElementById(this.id).focus();
        }
    }
    document.getElementById("email").addEventListener('blur', correo, false);
    /*******************************
     ******   EJERCICIO 7    ******
     *******************************/
    function provincias() {
        if (this.value == 0) {
            document.getElementById("errores").innerHTML = "ERROR: " + this.id.toUpperCase() + " no es correcto.";
            document.getElementById(this.id).focus();
        } else {
            document.getElementById("errores").innerHTML = "";
        }
    }
    document.getElementById("provincia").addEventListener('blur', provincias, false);
    /*******************************
     ******   EJERCICIO 8    ******
     *******************************/
    /*
    EXPRESIÓN REGULAR: ^(0[1-9]|[12][0-9]|3[01])[\\/-](0[1-9]|1[012])[\\/-](19|20)\\d\\d$
        -Dias: (0[1-9]|[12][0-9]|3[01]) 
                Son 3 opciones: 
                    1. 0[1-9] -->  Del 1 al 9 (empezando por 0, Ej: dia 01)
                    2. [12][0-9] --> Del 0 al 9 (empezando por 1 o 2, Ej: dia 12)
                    3. 3[01] --> El 0 o el 1 (empezando por 3, Ej: dia 31)
        -Meses: (0[1-9]|1[012])
                Son 2 opciones:
                    1. 0[1-9] --> Del 1 al 9 (empezando por 0, ej: mes 05)
                    2. 1[012] --> Del 0 al 2 (empezando por 1, ej: mes 11)
        -Años: (19|20)\\d\\d
                    (19|20) --> Dígito que empieza por 19 o 20
                    \\d\\d  --> Seguido por 2 dígitos numéricos cualquiera (0 a 9)
        -Símbolos [\\/-]
                    Entre dias y meses, meses y años; uno de esos simbolos
    */
    function fechas() {
        var expresionReg = new RegExp("^(0[1-9]|[12][0-9]|3[01])[\\/-](0[1-9]|1[012])[\\/-](19|20)\\d\\d$");
        if (expresionReg.test(this.value)) {
            document.getElementById("errores").innerHTML = "";
        } else {
            document.getElementById("errores").innerHTML = "ERROR: " + this.id.toUpperCase() + " no es correcta.";
            document.getElementById(this.id).focus();
        }
    }
    document.getElementById("fecha").addEventListener('blur', fechas, false);
    /*******************************
     ******   EJERCICIO 9    ******
     *******************************/
    /*
    (hecha 100% por mi, seguramente hay una forma mas eficiente de hacerlo)

    EXPRESIÓN REGULAR: ^\\d{9}$
        \d --> solo valores numéricos
        {9} --> exactamente 9 carácteres
    */
    function tfn() {
        var expresionReg = new RegExp("^\\d{9}$");
        if (expresionReg.test(this.value)) {
            document.getElementById("errores").innerHTML = "";
        } else {
            document.getElementById("errores").innerHTML = "ERROR: " + this.id.toUpperCase() + " no es correcto.";
            document.getElementById(this.id).focus();
        }
    }
    document.getElementById("telefono").addEventListener('blur', tfn, false);
    /*******************************
     ******   EJERCICIO 10    ******
     *******************************/
    /*
    (hecha 100% por mi, seguramente hay una forma mas eficiente de hacerlo)

    EXPRESIÓN REGULAR: ^([01][0-9]|2[0-3]):[0-5][0-9]$
        -Hora: ([01][0-9]|2[0-3])
                Son dos opciones:
                    1. [01][0-9] -->Número del 0 al 9 (Empezando por 0 o 1, ej: 00)
                    2.  2[0-3] --> Nñumero del 0 al 3 (Empezando por 2, ej: 23)
        -Minuto: [0-5][0-9]
                Número del 0 al 9 (Empezando por otro de 0 al 5, ej: 05,19,22,30,43,59)
    */
    function horas() {
        var expresionReg = new RegExp("^([01][0-9]|2[0-3]):[0-5][0-9]$");
        if (expresionReg.test(this.value)) {
            document.getElementById("errores").innerHTML = "";
        } else {
            document.getElementById("errores").innerHTML = "ERROR: " + this.id.toUpperCase() + " no es correcto.";
            document.getElementById(this.id).focus();
        }
    }
    document.getElementById("hora").addEventListener('blur', horas, false);
    /*******************************
     ******   EJERCICIO 11    ******
     *******************************/
    function comprobar() {
        event.preventDefault();
        if (document.getElementById("nombre").value == "" ||
             document.getElementById("apellidos").value == "" ||
              document.getElementById("edad").value == "" || 
               document.getElementById("nif").value == ""||
                document.getElementById("email").value == ""||
                 document.getElementById("provincia").value == 0||
                  document.getElementById("fecha").value == ""||
                   document.getElementById("telefono").value == ""||
                    document.getElementById("hora").value == "") {
            document.getElementById("errores").innerHTML = "ERROR: Rellena todos los campos antes de continuar";
        }else{
            window.open("https://www.eusa.es/tag/nuevas-profesiones/","_self");
        }
    }
    document.getElementById("enviar").addEventListener('click', comprobar, false);
}
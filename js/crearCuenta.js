window.onload = iniciar;

function iniciar() {
    /*
        ***haEntrado esta siempre a false. 
        Cuando hace login y encuentra el usuario que hace login lo pone a true.
        En la siguiente página busca el true: lo saca, lo guarda y lo pone a false de nuevo.
    */
    function Patinador(pass, mail) {
        this.pass = pass;
        this.mail = mail;
        this.valoresDeDesgaste = new Array();
        this.acumuladoDesgaste = new Array();
        this.valoresDeDesgaste = function (valor) {
            this.valoresDeDesgaste = valor.slice();
        };
        this.acumuladoDesgaste = function (valor) {
            this.acumuladoDesgaste = valor.slice();
        };
        this.haEntrado = function (valor) {
            this.haEntrado = valor;
        };
        this.haCompletadoFormulario = function (valor) {
            this.haCompletadoFormulario = valor;
        };
    };

    function guardarDatos() {
        event.preventDefault(); //quizas poner esto en otro sitio 
        var nombre = document.getElementById("nombre").value;
        var pass = document.getElementById("pass").value;
        var passConf = document.getElementById("passConf").value;
        var correo = document.getElementById("email").value;
        if (nombre != "" && pass != "" && correo != "") {
            if (localStorage.getItem(nombre) === null) { //Comprueba si existe usuario. Si no existe, lo crea.
                if (passConf == pass) { //Si contraseñas coinciden
                    var persona = new Patinador(pass, correo);
                    //Valores por defecto, se asignan al crear la cuenta.
                    var valoresDesgaste = [
                        [15, 60, 1],
                        [5, 35, 2],
                        [10, 50, 3],
                        [15, 60, 4],
                        [5, 35, 5],
                        [10, 50, 6]
                    ];
                    persona.valoresDeDesgaste(valoresDesgaste);
                    persona.acumuladoDesgaste = valoresDesgaste.slice(); // Primera vez, valoresde desgaste y acumulado valen lo mismo.
                    /*
                    El sort valores de desgaste se hace solo una vez. 
                    El sort de acumulao de desgaste se hace cada vez que el usuario cambia ruedas.
                    */
                    persona.haEntrado(false); //Para encontrar usuario en la siguiente página, al hacer login pongo true y busco el único true luego.
                    persona.haCompletadoFormulario(false);
                    localStorage.setItem(nombre, JSON.stringify(persona));
                    window.open("index.html", "_self");
                } else { //Si no coinciden...
                    document.getElementById("confirmacion").innerHTML = "Las constraseñas no coinciden.";
                }
            } else { //Si existe alerta a usuario y no hace nada
                document.getElementById("confirmacion").innerHTML = "Ya hay un usuario con ese nombre";
            }
        }
    }
    document.getElementById("enviar").addEventListener('click', guardarDatos, false);
}
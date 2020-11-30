window.onload = iniciar;

function iniciar() {
    /*Crear objeto aqui con: 
        Atributos: contrasenia, email, valoresDesgaste(array), acumuladoDesgaste(array), haEntrado***
        Metodos: geters de todos, setters y moverRuedas quizas? (este ultimo es el calculo de todo)


        ***haEntrado esta siempre a false. 
        Cuando hace login y encuentra el usuario que hace login lo pone a true.
        En la siguiente página busca el true: lo saca, lo guarda y lo pone a false de nuevo. Sacar con --> JSON.parse(localStorage.getItem( localStorage.key(i))); 
    */
    function Patinador(pass, mail) {
        this.pass = pass;
        this.mail = mail;
        this.valoresDeDesgaste = new Array();
        this.acumuladoDesgaste = new Array();
        //para acceder a estas matrices: matriz = objeto.valoresDeDesgaste;
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
                        [10, 60, 1],
                        [10, 35, 2],
                        [10, 50, 3],
                        [10, 60, 4],
                        [10, 35, 5],
                        [10, 50, 6]
                    ];
                    var desgasteAcumulado = [
                        [10, 60, 1],
                        [10, 35, 2],
                        [10, 50, 3],
                        [10, 60, 4],
                        [10, 35, 5],
                        [10, 50, 6]
                    ];
                    persona.valoresDeDesgaste(valoresDesgaste);
                    persona.acumuladoDesgaste(desgasteAcumulado);
                    persona.haEntrado(false); //Para encontrar usuario en la siguiente página, al hacer login pongo true y busco el único true luego.
                    persona.haCompletadoFormulario(false);
                    localStorage.setItem(nombre, JSON.stringify(persona));
                    document.getElementById("confirmacion").innerHTML = "Se ha creado la cuenta correctamente.";
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
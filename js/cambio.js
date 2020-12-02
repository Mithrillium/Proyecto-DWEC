var usuario = null;
var nombre = "";
window.onload = compruebaUsuario;
function compruebaUsuario() {
    var encontrado = false;
    var i = 0;
    while (!encontrado) {
        usuario = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if (usuario.haEntrado) {
            nombre = localStorage.key(i);
            usuario.haEntrado = false;
            localStorage.setItem(nombre, JSON.stringify(usuario));
            encontrado = true;
        }
        i++;
    }
    /*
    Proceso: ORDENAR,MOSTRAR,ACUMULAR
        1. Ordeno el desgaste acumulado (acumuladoDesgaste).
          1.1. Aunque el orden ha cambiado [x][2] aun mantiene posición en la que está.
        2. Muestro cambios.
          2.1. Matriz acumuladoDesgaste[x][2] contiene posición actual, ordenado el desgaste de mayor a menor.
               Matriz valoresDeDesgaste[x][2] contiene cuanto desgaste se va a cumular en esa posición, ordenado de menor a mayor.
               La rueda con más desgaste acumulado ire a la posición que menos desgaste aplicará en la siguiente iteración.
        3. Acumulo el desgaste para la siguiente iteración.
          3.2. Valores acumuladoDesgaste[x][2] valen lo mismo que valoresDeDesgaste[x][2] (esa es su nueva posición)
    */
    function calculaMovimientos() {
        var mensaje = "";
        //var prueba = ""; //Declarado bajo var mensaje
        usuario.acumuladoDesgaste = usuario.acumuladoDesgaste.sort((a, b) => b[1] - a[1]);
        for (var i = 0; i < 6; i++) {
            var acumuladoPosicion = usuario.acumuladoDesgaste[i][2];
            var valorPosicion = usuario.valoresDeDesgaste[i][2];
            if(valorPosicion == acumuladoPosicion){
                mensaje = mensaje + "Rueda en posición " + acumuladoPosicion + " sigue en la misma posición. Rotar la rueda.<br/>";
            }else{
                if(acumuladoPosicion >= 3){
                    if(valorPosicion >= 3){
                        mensaje = mensaje + "Rueda en posición " + acumuladoPosicion + " a posición "+ valorPosicion +" (mismo patín). Rotar la rueda.<br/>";
                    }else{
                        mensaje = mensaje + "Rueda en posición " + acumuladoPosicion + " a posición "+ valorPosicion +" (cambia de patín). Rotar la rueda.<br/>";
                    }
                }else{
                    if(valorPosicion <= 2){
                        mensaje = mensaje + "Rueda en posición " + acumuladoPosicion + " a posición "+ valorPosicion +" (mismo patín). Rotar la rueda.<br/>";
                    }else{
                        mensaje = mensaje + "Rueda en posición " + acumuladoPosicion + " a posición "+ valorPosicion +" (cambia de patín). Rotar la rueda.<br/>";
                    }
                }
            }
            //La rueda gira, giran los valores.
            var auxiliar = usuario.acumuladoDesgaste[i][0];
            usuario.acumuladoDesgaste[i][0] = usuario.acumuladoDesgaste[i][1];
            usuario.acumuladoDesgaste[i][1] = auxiliar;
            //Una vez acumulado el mensaje de esta rueda, su nueva posición es valorPosición.
            usuario.acumuladoDesgaste[i][2] = valorPosicion;
            //Sumo valores (acumulo) para la proxima vez que pulse el boton.
            usuario.acumuladoDesgaste[i][0] = usuario.acumuladoDesgaste[i][0] + usuario.valoresDeDesgaste[i][0];
            usuario.acumuladoDesgaste[i][1] = usuario.acumuladoDesgaste[i][1] + usuario.valoresDeDesgaste[i][1];
            //prueba = prueba + usuario.acumuladoDesgaste[i][0] + " - "+ usuario.acumuladoDesgaste[i][1]+"<br/>"; //Final del fore
        }
        //Sobreescribo el usuario con sus cambios.
        localStorage.setItem(nombre, JSON.stringify(usuario));
        document.getElementById("confirmacion").innerHTML = mensaje;
        //document.getElementById("prueba").innerHTML = prueba; //Tras el for para mostrar
    }
    document.getElementById("calcular").addEventListener('click', calculaMovimientos, false);
                /*
            En este for tambien hay que comprobar:
                1. Si acumulado de acumuladoDesgaste[x][0] es mayor que acumuladoDesgaste[x][1]. 
                    1.1. Ordenar por el mayor de los dos, no siempre por acumuladoDesgaste[x][1].
                2. Si gira sobre si mismo o no 
                    2.1. Mismo patín [x][0] < [x][1] rota. Osea, si el exterior esta menos desgastado, rota. 
                    2.2. Cambia patín [x][0] > [x][1] rota. Osea, si el exterior está más desgastado, será otra vez exterior.
            Probado con:
                var prueba = ""; //Declarado bajo var mensaje
                prueba = prueba + usuario.acumuladoDesgaste[i][0] + " - "+ usuario.acumuladoDesgaste[i][1]+"<br/>"; //Final del for
                document.getElementById("prueba").innerHTML = prueba; //Tras el for para mostrar
            */
}
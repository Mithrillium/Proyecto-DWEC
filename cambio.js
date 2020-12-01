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
    function calculaMovimientos() {
        var mensaje = "";
        usuario.acumuladoDesgaste = usuario.acumuladoDesgaste.sort((a, b) => b[1] - a[1]); //Este sort se hace solo una vez, al entregar el formulario de como se patina. No ene este docu.
        usuario.valoresDeDesgaste = usuario.valoresDeDesgaste.sort((a, b) => a[1] - b[1]); //Este sort se hace cada vez que el usuario valla a cambiar ruedas.
        for (var i = 0; i < 6; i++) {
            var acumuladoPosicion = usuario.acumuladoDesgaste[i][2];
            var valorPosicion = usuario.valoresDeDesgaste[i][2];
            //alert("Rueda en posición " + acumuladoPosicion + " a posición " +valorPosicion + ".");   {{MENSAJE SALIDA}}
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
            /*
            En este for tambien hay que comprobar:
                1. Si cambia o no de posición.
                2. Si cambia, si cambia o no de patín.
                3. Si gira sobre si mismo o no 
                    3.1 Mismo patín [x][0] < [x][1] rota. Osea, si el exterior esta menos desgastado, rota. 
                    3.2 Cambia patín [x][0] > [x][1] rota. Osea, si el exterior está más desgastado, será otra vez exterior.
            Probado con:
                var prueba = ""; //Declarado bajo var mensaje
                prueba = prueba + usuario.acumuladoDesgaste[i][0] + " - "+ usuario.acumuladoDesgaste[i][1]+"<br/>"; //Antes de este comentario
                document.getElementById("prueba").innerHTML = prueba; //Tras el for para mostrar
            */
        }
        //Sobreescribo el usuario con sus cambios.
        localStorage.setItem(nombre, JSON.stringify(usuario));
        document.getElementById("confirmacion").innerHTML = mensaje;
    }
    document.getElementById("calcular").addEventListener('click', calculaMovimientos, false);
}
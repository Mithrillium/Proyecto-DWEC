var usuario = null;
var nombre = "";
window.onload = compruebaUsuario;
function compruebaUsuario(){
    var encontrado = false;
    var i = 0;
    while(!encontrado){
        usuario = JSON.parse(localStorage.getItem( localStorage.key(i)));
        if(usuario.haEntrado){
            nombre = localStorage.key(i);
            usuario.haEntrado = false;
            localStorage.setItem(nombre, JSON.stringify(usuario));
            encontrado = true;
            document.getElementById("nom").innerHTML = nombre;
        }
        i++;
    }
    function chekeo(){
        if(document.getElementById("pierna").value != 0 &&
             document.getElementById("formaFrenar").value != 0 &&
              document.getElementById("tipoRueda").value != 0){
            //Patin izquierdo son indices 0, 1 y 2
            if(document.getElementById("pierna").value =="zurdo"){
                for(var j = 0 ; j < 3 ; j++){
                    for(var k = 0 ; k < 2 ; k++){
                        usuario.valoresDeDesgaste[j][k] = usuario.valoresDeDesgaste[j][k] + 5;
                    }
                }
            }
            //Patin derecho son indices 3, 4 y 5
            if(document.getElementById("pierna").value =="diestro"){
                for(var j = 3 ; j < 6 ; j++){
                    for(var k = 0 ; k < 2 ; k++){
                        usuario.valoresDeDesgaste[j][k] = usuario.valoresDeDesgaste[j][k] + 5;
                    }
                }
            }
            //Si frena en t y es zurdo, incrementa desgaste interior del pie izquierdo
            if(document.getElementById("formaFrenar").value =="t" && document.getElementById("pierna").value =="zurdo"){
                usuario.valoresDeDesgaste[0][1] = usuario.valoresDeDesgaste[0][1] + 10;
                usuario.valoresDeDesgaste[1][1] = usuario.valoresDeDesgaste[1][1] + 10;
                usuario.valoresDeDesgaste[2][1] = usuario.valoresDeDesgaste[2][1] + 20;
            }
            //Si frena en t y es diestro, incrementa desgaste interior del pie derecho
            if(document.getElementById("formaFrenar").value =="t" && document.getElementById("pierna").value =="diestro"){
                usuario.valoresDeDesgaste[3][1] = usuario.valoresDeDesgaste[3][1] + 10;
                usuario.valoresDeDesgaste[4][1] = usuario.valoresDeDesgaste[4][1] + 10;
                usuario.valoresDeDesgaste[5][1] = usuario.valoresDeDesgaste[5][1] + 10;
            }
            //Si frena en V ambos patines incrementan desgaste exterior
            if(document.getElementById("formaFrenar").value =="v"){
                usuario.valoresDeDesgaste[0][0] = usuario.valoresDeDesgaste[0][0] + 10;
                usuario.valoresDeDesgaste[1][0] = usuario.valoresDeDesgaste[1][0] + 10;
                usuario.valoresDeDesgaste[2][0] = usuario.valoresDeDesgaste[2][0] + 10;
                usuario.valoresDeDesgaste[3][0] = usuario.valoresDeDesgaste[3][0] + 10;
                usuario.valoresDeDesgaste[4][0] = usuario.valoresDeDesgaste[4][0] + 10;
                usuario.valoresDeDesgaste[5][0] = usuario.valoresDeDesgaste[5][0] + 10;
            }
            //La primera vez, el desgaste acumulado es igual a los valores de desgaste.
            usuario.acumuladoDesgaste = usuario.valoresDeDesgaste.slice();
            usuario.haEntrado = true;
            usuario.haCompletadoFormulario = true;
            localStorage.setItem(nombre, JSON.stringify(usuario));
            window.open("cambiaRuedas.html","_self");
        }else{
            document.getElementById("confirmacion").innerHTML ="Falta alguna opción por elegir";
        }
    }
    document.getElementById("enviar").addEventListener('click', chekeo, false);
}
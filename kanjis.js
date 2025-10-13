//Cuando tenga más kanjis sólo tengo que añadirlos al json, plantilla:
//{"significado": "A", "kana":"あ", "kanji":"〇"},

//Declaramos las variables por fuera
var n5json = {}
var n4json = {}
var n5array = {}
var n4array = {}
var estado = "sinempezar"
var kanjis = []
var posicion = 0

//Los elementos que vamos a tocar
var n5check = document.querySelector("#N5")
var n4check = document.querySelector("#N4")
var kanjiBoton = document.querySelector("#kanji")
var significado = document.querySelector("#significado")
var kana = document.querySelector("#kana")
var opciones = document.querySelector(".opciones")
var opcionesTexto = document.querySelector(".opciones").innerHTML
var body = document.querySelector("body");

//Esto lo he cogido de internet. Para mezclar los kanjis
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}

function cargar(){
    //Importamos los json y los metemos en una variable nueva así es el array solito vaya tarea esto
    n5json = import("./n5.json", { with: { type: "json" } });
    n4json = import("./n4.json", { with: { type: "json" } });
    n5json.then((json) => n5array = json.default.kanjis)
    n4json.then((json)=> n4array = json.default.kanjis)
}



function boton(){
    switch (estado){
        case "sinempezar":
            //Vaciar los kanjis por si acaso
            kanjis = []
            //Mirar si no hay nada marcado para poner el mensaje de elegir algo
            if (!n5check.checked && !n4check.checked){
                kanjiBoton.innerHTML = "¡Elige algo!"
            }
            else{
                //Si alguno está marcado, añadirle los arrays n5 o n4 o ambos
                if (n5check.checked){
                    kanjis = kanjis.concat(n5array)
                }
                if (n4check.checked){
                    kanjis = kanjis.concat(n4array)
                }
                //cambiar el botón
                kanjiBoton.classList.remove("empezar")
                kanjiBoton.classList.add("kanji")
                kanjiBoton.innerHTML = "?"
                estado = "kanjitapado"

                kanjis = shuffle(kanjis)
                console.log(kanjis)
                
                //Poner los ejemplos y el significado
                significado.innerHTML = ""
                kana.innerHTML = ""
                significado.innerHTML = kanjis[posicion].significado
                kana.innerHTML = kanjis[posicion].kana

                //Hacer que no puedas tocar las checkboxes
                /*n5check.disabled = true;
                n4check.disabled = true;*/

                //Borrar las checkboxes (no pasa nada están guardadas en variable opcionesTexto)
                opciones.innerHTML = ""
                //añadir el conteo
                opciones.innerHTML = "<p>" + (posicion + 1) + " de " + kanjis.length + "</p>";
            }
            break;

        case "kanjitapado":
            //Enseñar el kanji y pasar al siguiente paso
            kanjiBoton.innerHTML = kanjis[posicion].kanji
            estado = "kanjimostrado"
            posicion += 1 
        break;
        
        case "kanjimostrado":
            //Comprobar si hemos terminado o no
            if(posicion > kanjis.length - 1){
                //Aquí acabamos y volvemos al principio
                significado.innerHTML = ""
                kana.innerHTML = ""
                kanjiBoton.classList.remove("kanji")
                kanjiBoton.classList.add("empezar")
                alert("¡Has terminado! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧")
                significado.innerHTML = "Significado"
                kana.innerHTML = "Ejemplo"
                kanjiBoton.innerHTML = "Empezar"
                posicion = 0
                estado = "sinempezar"
                //Checkboxes otra vez
                opciones.innerHTML = ""
                opciones.innerHTML = opcionesTexto
                //Desmarcar las dos. Primero seleccionarlas de nuevo o se raya
                n5check = document.querySelector("#N5")
                n4check = document.querySelector("#N4")
                n5check.checked = false
                n4check.checked = false
            }
            else{
                //Volver a kanjitapado si aún sigue la cosa
                significado.innerHTML = ""
                kana.innerHTML = ""
                significado.innerHTML = kanjis[posicion].significado
                kana.innerHTML = kanjis[posicion].kana
                kanjiBoton.innerHTML = "?"
                estado = "kanjitapado"

                //Cambiar el conteo
                opciones.innerHTML = ""
                //Actualizar el conteo
                opciones.innerHTML = "<p>" + (posicion + 1) + " de " + kanjis.length + "</p>";
            }
        break;
    }
}


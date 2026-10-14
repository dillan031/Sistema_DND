//Se importa la libreria readlinesync que permite solicitar informacion del usuario en la terminal de forma asincrona.
import readlineSync from "readline-sync";

//Se crea la funcion pedir numero que se encarga de almacenar los numeros pedidos en consola.
function pedirNumero(pregunta, min, max) {
    //Desde que sea cierto
  while (true) {
    //el texto se encarga de recoger los datos por medio de una variable de pregunta.
    const texto = readlineSync.question(pregunta + " ");
    //El valor se encarga de convetir el numero a texto para que sea interpretado
    const valor = Number(texto);

    //Si el numero es un entero adecuado que no sea menor a 1 o mayor a 20.
    if (Number.isInteger(valor) && valor >= min && valor <= max) {
        //se retorna el valor de los dados puestos en las consolas.
      return valor;
    }
    //Si no es el caso el valor no es valido al no ser un numero entero adecuado.
    console.log(`Valor no válido: escribe un entero entre ${min} y ${max}.`);
  }
}
//Se crea la funcion que define la tirada manual de los dados en el sistema.
export function createManualRoller() {
  return {
    //Se toma el resultado del dado de 20.
    d20: (motivo) => pedirNumero(`${motivo}: ¿qué sacaste en el d20? (sin sumar modificadores)`, 1, 20),
    //Se toma el resultado de varios dados y caras.
    dice: (count, sides, motivo) => pedirNumero(`${motivo}: suma de ${count}d${sides} (sin sumar modificadores)`, count, count * sides),
  };
}
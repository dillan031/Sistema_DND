//Se crea en sistema una funcion llamada rollDie que se encarga de simular el lanzaimiento de un dado de 20 caras.
export function rollDie(sides) {
    return Math.floor(Math.random() * sides) + 1;
}
// se crea una funcion llamada rollDice esta funcion tiene Count y sides.
//Count es la cantidad de veces que se lanzara el dado y sides la cantidad de caras del dado. 
export function rollDice(count, sides){
    let total= 0;
//Se usa un bucle For para calcular el total de lanzamientos de los dados.
//se llama a la funcion rollDie para obtener el resultado y se suma al total.
//el bucle cumple la funcion de repetir el lanzamiento la cantidad de veces que se indique en count.
    for (let i = 0; i < count; i++) {
        total += rollDie(sides);
    }
//por ultimo se retorna el total de lanzamientos de cada dado.
    return total;
}
//Se crea en sistema una funcion llamada getModifier que calcula el modificador de habilidad de un personaje.
export function getModifier(score){
    return Math.floor((score - 10) / 2);
}
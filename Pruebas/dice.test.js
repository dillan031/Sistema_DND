// en este archivo se realizan las pruebas principales de las funciones de los dados.
//Buscando que los resultados sean acordes a lo esperado.
//Se importan las librerias de vitest para realizar las pruebas de funcionamiento.
import { describe, it, expect} from "vitest";
//Se importa la funcion rollDie que es la que representa el dado de 20 caras.
//Y rollDice que representa los dados de diferentes caras.
import { rollDie, rollDice} from "../src/sistema/Dice.js";

//Se crea un modelo de prueba para la funcion rollDie.
//En el que se espera que el resultado sea un numero entero entre 1 y 20.
describe("rollDie", () => {
    it("siempre devuelve un numero entero entre 1 y 20", () =>{
        //Se realiza un bucle for que simula el lanzamiento del dado 1000 veces buscando verificar los resultados.
        for (let i = 0; i < 1000; i++) {
            // se guarda el resultado de la funcion en la variable result.
            const result = rollDie(20);
            //se usa expect para asegurar que el resultado sea mayor o igual a 1 y menor o igual a 20.
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThanOrEqual(20);
            //se usa de nuevo para asegurar que el resultado sea un numero entero.
            expect(Number.isInteger(result)).toBe(true);
        }
    })
})

//Se crea un modelo de prueba para la funcion rollDice.
//En el que se espera que el resultado sea un numero entero acorde a la cantidad de lanzamientos y caras.
describe("rollDice", () => {
    it("Siempre devuelve un numero entero acorde a la cantidad de Lanzamientos y Caras de cada dado", () => {
        //Se realiza un bucle for que simula el lanzamiento del dado 1000 veces buscando verificar los resultados.
        for (let i = 0; i < 1000; i++) {
             // se guarda el resultado de la funcion en la variable result2.
            const result = rollDice(3, 6);
            const result2 = rollDice(3, 8);
            //se usa expect para asegurar que el resultado sea mayor o igual a 3 y menor o igual a 18.
            expect(result).toBeGreaterThanOrEqual(3);
            expect(result).toBeLessThanOrEqual(18);
            //se usa de nuevo para asegurar que el resultado sea un numero entero.
            expect(Number.isInteger(result)).toBe(true);
            //se usa expect para asegurar que el resultado sea mayor o igual a 3 y menor o igual a 24.
            expect(result2).toBeGreaterThanOrEqual(3);
            expect(result2).toBeLessThanOrEqual(24);
            //se usa de nuevo para asegurar que el resultado sea un numero entero.
            expect(Number.isInteger(result2)).toBe(true);
        }
    })
})
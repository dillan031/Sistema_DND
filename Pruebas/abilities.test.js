//En este archivo se realizan las pruebas principales de las habilidades.
//Se importan las librerias de vitest para realizar las pruebas de funcionamiento.
import { describe, it, expect} from "vitest";
//Se importa la funcion getModifier que es la que calcula el modificador de habilidad.
import { getModifier } from "../src/sistema/abilities.js";

//Se crea un modelo de prueba para la funcion getModifier.
describe("getModifier", () => {
    it("devuelve 0 para los valores entre 10 y 11", () => {
        expect(getModifier(10)).toBe(0);
        expect(getModifier(11)).toBe(0);
    });

    it("devuelve modificadores positivos para atributos altos", () => {
        expect(getModifier (12), (13)).toBe(1);
        expect(getModifier (14), (15)).toBe(2);
        expect(getModifier (16), (17)).toBe(3);
        expect(getModifier (18), (19)).toBe(4);
        expect(getModifier (20)).toBe(5);
    });

    it("devuelve modificadores negativos para atributos bajos", () => {
        expect(getModifier (8), (9)).toBe(-1);
        expect(getModifier (6), (7)).toBe(-2);
        expect(getModifier (4), (5)).toBe(-3);
        expect(getModifier (3), (2)).toBe(-4);
        expect(getModifier (1)).toBe(-5);
    })
})